import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// استيراد الـ Loader مباشرة من المكتبة التي ثبتناها
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const DoctorRobotAvatar = ({ 
  avatarUrl = 'https://models.readyplayer.me/69530adc0ca398caeab557ae.glb?referrer=grok.com', 
  containerStyle = {} 
}) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    
    // Setup Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    
    // Setup Camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 1.6, 2);
    camera.lookAt(0, 1, 0);
    
    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 4, 3);
    scene.add(directionalLight);
    
    let avatar = null;
    let mixer = null;
    let clock = new THREE.Clock();
    let animationId = null;

    // استخدام الـ Loader مباشرة
    const loader = new GLTFLoader();
    loader.load(
      avatarUrl,
      (gltf) => {
        avatar = gltf.scene;
        avatar.scale.set(1, 1, 1);
        avatar.position.set(0, 0, 0);
        scene.add(avatar);
        
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(avatar);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error:', err);
        setError('Failed to load avatar');
        setLoading(false);
      }
    );

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      if (avatar) avatar.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

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
    };
  }, [avatarUrl]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', ...containerStyle }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      {loading && <div style={overlayStyle}>⏳ Loading Avatar...</div>}
      {error && <div style={{...overlayStyle, color: 'red'}}>❌ {error}</div>}
    </div>
  );
};

const overlayStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  color: 'white', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '10px'
};

export default DoctorRobotAvatar;