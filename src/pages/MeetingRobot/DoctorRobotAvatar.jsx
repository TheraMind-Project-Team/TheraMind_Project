import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const DoctorRobotAvatar = ({ 
  avatarUrl = '/69530adc0ca398caeab557ae.glb', 
  containerStyle = {} 
}) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    
    // ── Scene ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera ─────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 1.72, 0.85);
    camera.lookAt(0, 1.68, 0);
    
    // ── Renderer ───────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ── Environment ────────────────────────────────────────────────────
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = 2;
    bgCanvas.height = 512;
    const bgCtx = bgCanvas.getContext('2d');
    const grad = bgCtx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0,   '#1b2a3b');
    grad.addColorStop(0.5, '#243447');
    grad.addColorStop(1,   '#1a2535');
    bgCtx.fillStyle = grad;
    bgCtx.fillRect(0, 0, 2, 512);
    scene.background = new THREE.CanvasTexture(bgCanvas);

    const floorGeo = new THREE.PlaneGeometry(6, 6);
    const floor = new THREE.Mesh(floorGeo, new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.8 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 4),
      new THREE.MeshStandardMaterial({ color: 0x8fa3b1, roughness: 0.9 })
    );
    wall.position.set(0, 2, -1.5);
    scene.add(wall);

    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.65, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x3b2a1a })
    );
    frame.position.set(-0.6, 2.1, -1.47);
    scene.add(frame);

    const painting = new THREE.Mesh(
      new THREE.PlaneGeometry(0.75, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x7fb3c8 })
    );
    painting.position.set(-0.6, 2.1, -1.44);
    scene.add(painting);

    const lampMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2c });
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.7 });

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.04, 16), lampMat);
    lampBase.position.set(0.9, 0.84, -0.6);
    scene.add(lampBase);

    const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 8), lampMat);
    lampPole.position.set(0.9, 1.09, -0.6);
    scene.add(lampPole);

    const lampShade = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.15, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xf5deb3, side: THREE.DoubleSide, emissive: 0xf5deb3, emissiveIntensity: 0.15 })
    );
    lampShade.position.set(0.9, 1.4, -0.6);
    scene.add(lampShade);

    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.4), tableMat);
    tableTop.position.set(0.9, 0.82, -0.6);
    scene.add(tableTop);

    // ── Lighting ───────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xd6e8f5, 0.5));

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.1);
    keyLight.position.set(0.5, 3, 2);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const lampLight = new THREE.PointLight(0xffd07a, 1.2, 3);
    lampLight.position.set(0.9, 1.4, -0.5);
    scene.add(lampLight);

    const fillLight = new THREE.DirectionalLight(0xc8d8e8, 0.4);
    fillLight.position.set(-2, 2, 1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x88aacc, 0.5);
    rimLight.position.set(0, 2, -2);
    scene.add(rimLight);

    // ── Blink System ───────────────────────────────────────────────────
    // أسماء الـ morph targets الشائعة في Ready Player Me
    const BLINK_TARGETS = [
      'eyesClosed',        // الأكثر شيوعاً في RPM
      'eyeBlinkLeft',
      'eyeBlinkRight', 
      'EyesClosed',
      'blink',
    ];

    let eyeMeshes = [];       // الـ meshes اللي عندها morph targets للعيون
    let blinkState = {
      isBlinking: false,
      blinkProgress: 0,      // 0 = مفتوح, 1 = مغلق
      nextBlinkTime: 3,      // ثواني للرمشة الجاية
      elapsedTime: 0,
    };

    // دالة لإيجاد الـ morph target index
    const findBlinkIndex = (mesh) => {
      if (!mesh.morphTargetDictionary) return null;
      for (const name of BLINK_TARGETS) {
        if (mesh.morphTargetDictionary[name] !== undefined) {
          return { index: mesh.morphTargetDictionary[name], type: 'combined' };
        }
      }
      // جرب Left و Right منفصلين
      const leftIdx  = mesh.morphTargetDictionary['eyeBlinkLeft'];
      const rightIdx = mesh.morphTargetDictionary['eyeBlinkRight'];
      if (leftIdx !== undefined || rightIdx !== undefined) {
        return { leftIdx, rightIdx, type: 'separate' };
      }
      return null;
    };

    // دالة تطبيق الرمشة على الـ mesh
    const applyBlink = (mesh, blinkInfo, value) => {
      if (!mesh.morphTargetInfluences) return;
      if (blinkInfo.type === 'combined') {
        mesh.morphTargetInfluences[blinkInfo.index] = value;
      } else {
        if (blinkInfo.leftIdx  !== undefined) mesh.morphTargetInfluences[blinkInfo.leftIdx]  = value;
        if (blinkInfo.rightIdx !== undefined) mesh.morphTargetInfluences[blinkInfo.rightIdx] = value;
      }
    };

    // ── Load Avatar ────────────────────────────────────────────────────
    let avatar = null;
    let mixer  = null;
    const clock = new THREE.Clock();
    let animationId = null;

    const loader = new GLTFLoader();
    loader.load(
      avatarUrl,
      (gltf) => {
        avatar = gltf.scene;
        scene.add(avatar);

        avatar.traverse((child) => {
          if (child.isMesh) {
            child.castShadow    = true;
            child.receiveShadow = true;

            // جمع الـ meshes اللي عندها morph targets للعيون
            const blinkInfo = findBlinkIndex(child);
            if (blinkInfo) {
              eyeMeshes.push({ mesh: child, blinkInfo });
              console.log('✅ Found blink morph target on:', child.name, blinkInfo);
            }
          }
        });

        // لو ملقاش morph targets، هنعمل blink بطريقة بديلة (scale العيون)
        if (eyeMeshes.length === 0) {
          console.warn('⚠️ No blink morph targets found — using fallback scale method');
          avatar.traverse((child) => {
            const name = child.name.toLowerCase();
            if (name.includes('eye') && !name.includes('brow') && !name.includes('lash')) {
              eyeMeshes.push({ mesh: child, blinkInfo: { type: 'scale' } });
            }
          });
        }

        if (gltf.animations?.length > 0) {
          mixer = new THREE.AnimationMixer(avatar);
          mixer.clipAction(gltf.animations[0]).play();
        }

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('GLTFLoader Error:', err);
        setError('Failed to load avatar');
        setLoading(false);
      }
    );

    // ── Animate ────────────────────────────────────────────────────────
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      // ── Blink Logic ────────────────────────────────────────────────
      blinkState.elapsedTime += delta;

      if (!blinkState.isBlinking && blinkState.elapsedTime >= blinkState.nextBlinkTime) {
        // ابدأ رمشة
        blinkState.isBlinking    = true;
        blinkState.blinkProgress = 0;
        blinkState.elapsedTime   = 0;
        // الرمشة الجاية بعد 2.5 إلى 5 ثواني (عشوائي = طبيعي)
        blinkState.nextBlinkTime = 2 + Math.random() * 2;
      }

      if (blinkState.isBlinking) {
        blinkState.blinkProgress += delta / 0.08; // سرعة الرمشة (0.08 ثانية للإغلاق)

        let blinkValue;
        if (blinkState.blinkProgress < 1) {
          // مرحلة الإغلاق — easing ناعم
          blinkValue = Math.sin(blinkState.blinkProgress * Math.PI / 2);
        } else if (blinkState.blinkProgress < 1.4) {
          // مرحلة البقاء مغلق لحظة
          blinkValue = 1;
        } else if (blinkState.blinkProgress < 2.4) {
          // مرحلة الفتح
          blinkValue = 1 - Math.sin((blinkState.blinkProgress - 1.4) * Math.PI / 2);
        } else {
          // انتهت الرمشة
          blinkValue = 0;
          blinkState.isBlinking = false;
        }

        // طبّق على كل الـ eye meshes
        for (const { mesh, blinkInfo } of eyeMeshes) {
          if (blinkInfo.type === 'scale') {
            // fallback: ضغط العين على محور Y
            mesh.scale.y = 1 - blinkValue * 0.95;
          } else {
            applyBlink(mesh, blinkInfo, blinkValue);
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      scene.clear();
    };
  }, [avatarUrl]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', ...containerStyle }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      {loading && (
        <div style={overlayStyle}>
          <Spinner />
          <span style={{ marginTop: 10, fontSize: 14 }}>جاري التحميل...</span>
        </div>
      )}
      {error && (
        <div style={{ ...overlayStyle, color: '#ff6b6b' }}>❌ {error}</div>
      )}
    </div>
  );
};

const Spinner = () => (
  <div style={{
    width: 32, height: 32,
    border: '3px solid rgba(255,255,255,0.15)',
    borderTop: '3px solid #7fb3c8',
    borderRadius: '50%',
    animation: 'spin 0.9s linear infinite',
  }}>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const overlayStyle = {
  position: 'absolute', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white', background: 'rgba(0,0,0,0.6)',
  padding: '20px 28px', borderRadius: '12px',
  display: 'flex', flexDirection: 'column', alignItems: 'center',
};

export default DoctorRobotAvatar;