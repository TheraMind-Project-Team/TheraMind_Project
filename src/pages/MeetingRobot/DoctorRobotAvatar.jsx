import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const BASE_SMILE = 0.25;

const EXPRESSIONS = {
  neutral:    { morphs: { mouthSmile: BASE_SMILE, mouthOpen: 0 }, headTilt: 0, headNod: -0.08, headTurn: 0, bodyLean: 0, speed: 0.8 },
  happy:      { morphs: { mouthSmile: 1, mouthOpen: 0.2 }, headTilt: 0.05, headNod: -0.08, headTurn: 0, bodyLean: 0.03, speed: 1.2 },
  sad:        { morphs: { mouthSmile: BASE_SMILE, mouthOpen: 0 }, headTilt: 0, headNod: -0.08, headTurn: 0, bodyLean: -0.04, speed: 0.5 },
  angry:      { morphs: { mouthSmile: BASE_SMILE, mouthOpen: 0.1 }, headTilt: 0, headNod: -0.08, headTurn: 0, bodyLean: 0.06, speed: 1.0 },
  surprised:  { morphs: { mouthSmile: BASE_SMILE, mouthOpen: 0.8 }, headTilt: 0, headNod: -0.08, headTurn: 0, bodyLean: -0.05, speed: 2.0 },
  fearful:    { morphs: { mouthSmile: BASE_SMILE, mouthOpen: 0.3 }, headTilt: 0.08, headNod: -0.08, headTurn: -0.06, bodyLean: -0.06, speed: 1.5 },
  thinking:   { morphs: { mouthSmile: BASE_SMILE, mouthOpen: 0 }, headTilt: 0.1, headNod: -0.08, headTurn: 0.08, bodyLean: 0, speed: 0.6 },
  empathetic: { morphs: { mouthSmile: 0.45, mouthOpen: 0 }, headTilt: 0.08, headNod: -0.08, headTurn: 0, bodyLean: 0.04, speed: 0.7 },
  disgusted:  { morphs: { mouthSmile: BASE_SMILE, mouthOpen: 0.1 }, headTilt: -0.06, headNod: -0.08, headTurn: -0.1, bodyLean: -0.03, speed: 0.9 },
};

export const detectExpressionFromText = (text) => {
  if (!text) return 'neutral';
  const t = text.toLowerCase();
  const patterns = {
    happy:      ['سعيد','فرح','ممتاز','رائع','يسعدني','تحسن','إيجابي','happy','great','wonderful','😊','😄','🎉'],
    sad:        ['حزين','آسف','مؤلم','صعب','أعتذر','للأسف','sad','sorry','unfortunately','😢','😞'],
    angry:      ['غاضب','زعلان','محبط','غير مقبول','angry','frustrated','😠'],
    surprised:  ['مفاجأة','لم أتوقع','واو','مذهل','wow','really','surprising','😲'],
    fearful:    ['خوف','قلق','خطر','أخشى','تحذير','fear','worried','afraid','😨'],
    thinking:   ['دعني أفكر','حسناً','ربما','أعتقد','لنفكر','hmm','perhaps','consider','🤔'],
    empathetic: ['أفهمك','أشعر بك','هذا صعب','أنا هنا','أتفهم','understand','I\'m here','🥺'],
    disgusted:  ['مقزز','لا أوافق','رفض','disgusting','unacceptable'],
  };
  for (const [expr, words] of Object.entries(patterns)) {
    if (words.some(w => t.includes(w))) return expr;
  }
  return 'neutral';
};

const detectLang = (text) => {
  if (!text) return 'ar-SA';
  const hasArabic  = /[\u0600-\u06FF]/.test(text);
  const hasEnglish = /[a-zA-Z]/.test(text);
  if (hasArabic)  return 'ar-SA';
  if (hasEnglish) return 'en-US';
  return 'ar-SA';
};

const VISEMES = {
  AA:   { open: 0.95, wide: 0.3  },
  AE:   { open: 0.75, wide: 0.2  },
  OO:   { open: 0.65, wide: -0.1 },
  EE:   { open: 0.55, wide: 0.35 },
  IH:   { open: 0.40, wide: 0.25 },
  UH:   { open: 0.30, wide: 0.0  },
  MB:   { open: 0.02, wide: 0.0  },
  FV:   { open: 0.15, wide: 0.1  },
  TH:   { open: 0.20, wide: 0.05 },
  KG:   { open: 0.45, wide: 0.0  },
  REST: { open: 0.0,  wide: 0.0  },
};

const CHAR_TO_VISEME = {
  'ا': 'AA', 'آ': 'AA', 'أ': 'AA', 'إ': 'AE', 'ى': 'AA', 'ء': 'AA',
  'و': 'OO', 'ؤ': 'OO',
  'ي': 'EE', 'ئ': 'EE',
  'ع': 'AE', 'ح': 'AE', 'ه': 'AE',
  'خ': 'KG', 'غ': 'KG', 'ك': 'KG', 'ق': 'KG',
  'ت': 'TH', 'ث': 'TH', 'ذ': 'TH', 'ظ': 'TH',
  'د': 'IH', 'ض': 'IH', 'ج': 'IH', 'ش': 'IH', 'ز': 'IH', 'س': 'IH', 'ص': 'IH', 'ط': 'IH',
  'ل': 'UH', 'ن': 'UH', 'ر': 'UH',
  'م': 'MB', 'ب': 'MB',
  'ف': 'FV',
  'ة': 'AE',
  'a': 'AA', 'A': 'AA', 'e': 'EE', 'E': 'EE', 'i': 'EE', 'I': 'EE',
  'o': 'OO', 'O': 'OO', 'u': 'OO', 'U': 'OO',
  'm': 'MB', 'M': 'MB', 'b': 'MB', 'B': 'MB', 'p': 'MB', 'P': 'MB',
  'f': 'FV', 'F': 'FV', 'v': 'FV', 'V': 'FV',
  't': 'TH', 'T': 'TH',
  'd': 'IH', 'D': 'IH', 'n': 'UH', 'N': 'UH', 'l': 'UH', 'L': 'UH',
  'r': 'UH', 'R': 'UH', 's': 'IH', 'S': 'IH', 'z': 'IH', 'Z': 'IH',
  'k': 'KG', 'K': 'KG', 'g': 'KG', 'G': 'KG', 'c': 'KG', 'C': 'KG',
  'x': 'KG', 'X': 'KG', 'q': 'KG', 'Q': 'KG',
  'h': 'AE', 'H': 'AE', 'w': 'OO', 'W': 'OO', 'y': 'EE', 'Y': 'EE',
  'j': 'IH', 'J': 'IH',
};

const getViseme = (char) => VISEMES[CHAR_TO_VISEME[char] ?? 'REST'] ?? VISEMES.REST;

const TRANSITION  = 0.5;
const BLINK_NAMES = ['eyesClosed','eyeBlinkLeft','eyeBlinkRight','EyesClosed','blink'];
const IDLE_CYCLE  = ['neutral','thinking','empathetic','neutral','neutral'];

const DoctorRobotAvatar = ({
  avatarUrl         = '/69530adc0ca398caeab557ae.glb',
  aiText            = '',
  containerStyle    = {},
  speakOnTextChange = true,
  speechLang        = 'auto',
}) => {
  const canvasRef         = useRef(null);
  const eyeMeshesRef      = useRef([]);
  const allMorphMeshesRef = useRef([]);
  const headBoneRef       = useRef(null);
  const spineBoneRef      = useRef(null);

  const lipSyncRef = useRef({
    active:       false,
    chars:        [],
    charIndex:    0,
    charProgress: 0,
    currentOpen:  0,
    targetOpen:   0,
    currentWide:  0,
    targetWide:   0,
    stopAt:       0,
  });

  const exprStateRef = useRef({
    current:    { ...EXPRESSIONS.neutral },
    target:     { ...EXPRESSIONS.neutral },
    progress:   1,
    targetName: 'neutral',
  });

  const blinkRef     = useRef({ isBlinking: false, progress: 0, nextBlink: 3, elapsed: 0 });
  const idleTimerRef = useRef(null);
  const speechRef    = useRef(null);
  const watchdogRef  = useRef(null);

  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [currentExpr, setCurrentExpr] = useState('neutral');
  const [isSpeaking, setIsSpeaking]   = useState(false);

  const applyCurrentState = useCallback((state, lipOpenOverride = null, lipWideOverride = null) => {
    for (const { mesh, dict } of allMorphMeshesRef.current) {
      if (!mesh.morphTargetInfluences) continue;
      for (const [key, idx] of Object.entries(dict)) {
        if (!BLINK_NAMES.includes(key)) {
          let val = state.morphs?.[key] ?? 0;
          if (key === 'mouthOpen'  && lipOpenOverride !== null) val = lipOpenOverride;
          if (key === 'mouthSmile' && lipWideOverride !== null)
            val = Math.max(BASE_SMILE, state.morphs?.mouthSmile ?? BASE_SMILE) + lipWideOverride;
          mesh.morphTargetInfluences[idx] = Math.max(0, Math.min(1, val));
        }
      }
    }
    if (headBoneRef.current) {
      headBoneRef.current.rotation.z = state.headTilt ?? 0;
      headBoneRef.current.rotation.x = state.headNod  ?? 0;
      headBoneRef.current.rotation.y = state.headTurn ?? 0;
    }
    if (spineBoneRef.current) {
      spineBoneRef.current.rotation.x = state.bodyLean ?? 0;
    }
  }, []);

  const lerpState = (a, b, t) => {
    const ease = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;
    const lerp  = (x, y) => x + (y - x) * ease;
    return {
      morphs: {
        mouthSmile: lerp(a.morphs?.mouthSmile ?? BASE_SMILE, b.morphs?.mouthSmile ?? BASE_SMILE),
        mouthOpen:  lerp(a.morphs?.mouthOpen  ?? 0,          b.morphs?.mouthOpen  ?? 0),
      },
      headTilt:  lerp(a.headTilt  ?? 0, b.headTilt  ?? 0),
      headNod:   lerp(a.headNod   ?? 0, b.headNod   ?? 0),
      headTurn:  lerp(a.headTurn  ?? 0, b.headTurn  ?? 0),
      bodyLean:  lerp(a.bodyLean  ?? 0, b.bodyLean  ?? 0),
    };
  };

  const changeExpression = useCallback((name) => {
    const es = exprStateRef.current;
    es.current    = lerpState(es.current, EXPRESSIONS[es.targetName] || EXPRESSIONS.neutral, 1);
    es.target     = EXPRESSIONS[name] || EXPRESSIONS.neutral;
    es.targetName = name;
    es.progress   = 0;
    setCurrentExpr(name);
  }, []);

  const startLipSync = useCallback((text) => {
    const ls            = lipSyncRef.current;
    const estimatedMs   = text.length * 80;
    const chars         = text.replace(/[\s\u0640،.!?]/g, '').split('').filter(c => c.trim());
    ls.chars            = chars;
    ls.charIndex        = 0;
    ls.charProgress     = 0;
    ls.active           = true;
    ls.currentOpen      = 0;
    ls.targetOpen       = 0;
    ls.currentWide      = 0;
    ls.targetWide       = 0;
    ls.stopAt           = Date.now() + estimatedMs + 500;
  }, []);

  const stopLipSync = useCallback(() => {
    const ls       = lipSyncRef.current;
    ls.active      = false;
    ls.currentOpen = 0;
    ls.targetOpen  = 0;
    ls.currentWide = 0;
    ls.targetWide  = 0;
    ls.stopAt      = 0;
  }, []);

  const speakText = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    speechRef.current = null;

    if (watchdogRef.current) { clearInterval(watchdogRef.current); watchdogRef.current = null; }

    const lang = speechLang === 'auto' ? detectLang(text) : speechLang;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = lang;
    utterance.rate  = lang === 'ar-SA' ? 0.95 : 1.0;

    const onStop = () => {
      if (watchdogRef.current) { clearInterval(watchdogRef.current); watchdogRef.current = null; }
      const ls       = lipSyncRef.current;
      ls.active      = false;
      ls.currentOpen = 0;
      ls.targetOpen  = 0;
      ls.currentWide = 0;
      ls.targetWide  = 0;
      ls.stopAt      = 0;
      setIsSpeaking(false);
      changeExpression('neutral');
    };

    utterance.onstart = () => {
      setIsSpeaking(true);
      setTimeout(() => startLipSync(text), 80);
      watchdogRef.current = setInterval(() => {
        if (!window.speechSynthesis.speaking) onStop();
      }, 200);
    };

    utterance.onend   = onStop;
    utterance.onerror = onStop;

    utterance.onboundary = (ev) => {
      if (ev.name === 'word') {
        const word = text.substr(ev.charIndex, ev.charLength || 5);
        const ls   = lipSyncRef.current;
        const chars = word.replace(/[\s\u0640،.!?]/g, '').split('').filter(c => c.trim());
        ls.chars        = chars.length ? chars : ls.chars;
        ls.charIndex    = 0;
        ls.charProgress = 0;
        // تحديث وقت الإيقاف مع كل كلمة جديدة
        ls.stopAt = Date.now() + (word.length * 120) + 300;
      }
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [speechLang, startLipSync, stopLipSync, changeExpression]);

  useEffect(() => {
    if (!aiText) return;
    changeExpression(detectExpressionFromText(aiText));
    if (speakOnTextChange) speakText(aiText);
    const t = setTimeout(() => changeExpression('neutral'), Math.max(5000, aiText.length * 80));
    return () => {
      clearTimeout(t);
      window.speechSynthesis?.cancel();
      if (watchdogRef.current) { clearInterval(watchdogRef.current); watchdogRef.current = null; }
      stopLipSync();
      changeExpression('neutral');
    };
  }, [aiText, changeExpression, speakText, speakOnTextChange, stopLipSync]);

  useEffect(() => {
    let idx = 0;
    const schedule = () => {
      idleTimerRef.current = setTimeout(() => {
        if (!aiText) {
          idx = (idx + 1) % IDLE_CYCLE.length;
          changeExpression(IDLE_CYCLE[idx]);
          setTimeout(() => changeExpression('neutral'), 2500);
        }
        schedule();
      }, 7000 + Math.random() * 5000);
    };
    schedule();
    return () => clearTimeout(idleTimerRef.current);
  }, [aiText, changeExpression]);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = canvas.parentElement;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.72, 0.85);
    camera.lookAt(0, 1.68, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;

    const bgCv = document.createElement('canvas');
    bgCv.width = 2; bgCv.height = 512;
    const bgCtx = bgCv.getContext('2d');
    const grad  = bgCtx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#1b2a3b'); grad.addColorStop(0.5, '#243447'); grad.addColorStop(1, '#1a2535');
    bgCtx.fillStyle = grad; bgCtx.fillRect(0, 0, 2, 512);
    scene.background = new THREE.CanvasTexture(bgCv);

    const addMesh = (geo, mat, x, y, z, rx = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      if (rx) m.rotation.x = rx;
      scene.add(m);
      return m;
    };

    const floor = addMesh(new THREE.PlaneGeometry(6,6), new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.8 }), 0, 0, 0, -Math.PI/2);
    floor.receiveShadow = true;
    addMesh(new THREE.PlaneGeometry(6,4),          new THREE.MeshStandardMaterial({ color: 0x8fa3b1, roughness: 0.9 }), 0, 2, -1.5);
    addMesh(new THREE.BoxGeometry(0.85,0.65,0.04), new THREE.MeshStandardMaterial({ color: 0x3b2a1a }), -0.6, 2.1, -1.47);
    addMesh(new THREE.PlaneGeometry(0.75,0.55),    new THREE.MeshStandardMaterial({ color: 0x7fb3c8 }), -0.6, 2.1, -1.44);
    const lm = new THREE.MeshStandardMaterial({ color: 0x2c2c2c });
    const tm = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.7 });
    const sm = new THREE.MeshStandardMaterial({ color: 0xf5deb3, side: THREE.DoubleSide, emissive: 0xf5deb3, emissiveIntensity: 0.15 });
    addMesh(new THREE.CylinderGeometry(0.06,0.08,0.04,16), lm, 0.9, 0.84, -0.6);
    addMesh(new THREE.CylinderGeometry(0.015,0.015,0.5,8), lm, 0.9, 1.09, -0.6);
    addMesh(new THREE.ConeGeometry(0.12,0.15,16,1,true),   sm, 0.9, 1.4,  -0.6);
    addMesh(new THREE.BoxGeometry(0.7,0.04,0.4),           tm, 0.9, 0.82, -0.6);

    scene.add(new THREE.AmbientLight(0xd6e8f5, 0.5));
    const kl = new THREE.DirectionalLight(0xfff5e6, 1.1);
    kl.position.set(0.5, 3, 2); kl.castShadow = true; scene.add(kl);
    const ll = new THREE.PointLight(0xffd07a, 1.2, 3);
    ll.position.set(0.9, 1.4, -0.5); scene.add(ll);
    const fl = new THREE.DirectionalLight(0xc8d8e8, 0.4);
    fl.position.set(-2, 2, 1); scene.add(fl);
    const rl = new THREE.DirectionalLight(0x88aacc, 0.5);
    rl.position.set(0, 2, -2); scene.add(rl);

    let mixer = null;
    const clock = new THREE.Clock();
    let animId  = null;

    new GLTFLoader().load(avatarUrl, (gltf) => {
      const avatar = gltf.scene;
      scene.add(avatar);

      const eyeMeshes      = [];
      const allMorphMeshes = [];

      avatar.traverse((child) => {
        if (child.isBone || child.type === 'Bone') {
          const n = child.name.toLowerCase();
          if (n.includes('head') && !headBoneRef.current)  headBoneRef.current  = child;
          if ((n.includes('spine') || n.includes('chest') || n.includes('neck')) && !spineBoneRef.current)
            spineBoneRef.current = child;
        }
        if (!child.isMesh) return;
        child.castShadow = child.receiveShadow = true;
        if (!child.morphTargetDictionary) return;

        allMorphMeshes.push({ mesh: child, dict: child.morphTargetDictionary });

        let blinkInfo = null;
        for (const name of BLINK_NAMES) {
          if (child.morphTargetDictionary[name] !== undefined) {
            blinkInfo = { type: 'combined', index: child.morphTargetDictionary[name] };
            break;
          }
        }
        if (!blinkInfo) {
          const l = child.morphTargetDictionary['eyeBlinkLeft'];
          const r = child.morphTargetDictionary['eyeBlinkRight'];
          if (l !== undefined || r !== undefined)
            blinkInfo = { type: 'separate', leftIdx: l, rightIdx: r };
        }
        if (blinkInfo) eyeMeshes.push({ mesh: child, blinkInfo });
      });

      if (eyeMeshes.length === 0) {
        avatar.traverse((child) => {
          const n = child.name.toLowerCase();
          if (n.includes('eye') && !n.includes('brow') && !n.includes('lash'))
            eyeMeshes.push({ mesh: child, blinkInfo: { type: 'scale' } });
        });
      }

      eyeMeshesRef.current      = eyeMeshes;
      allMorphMeshesRef.current = allMorphMeshes;
      applyCurrentState(EXPRESSIONS.neutral);

      if (gltf.animations?.length > 0) {
        mixer = new THREE.AnimationMixer(avatar);
        mixer.clipAction(gltf.animations[0]).play();
      }

      setLoading(false);
    },
    undefined,
    (err) => { console.error(err); setError('Failed to load avatar'); setLoading(false); });

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      const es = exprStateRef.current;
      if (es.progress < 1) {
        const speed = es.target.speed ?? 1;
        es.progress = Math.min(1, es.progress + (delta / TRANSITION) * speed);
      }
      const interpState = es.progress < 1
        ? lerpState(es.current, es.target, es.progress)
        : es.target;

      // ── Lip Sync Update ──────────────────────────────────────────────
      const ls = lipSyncRef.current;
      let lipOpen = null;
      let lipWide = null;

      // وقف فوري لو الصوت وقف أو الوقت انتهى
      if (ls.active && (!window.speechSynthesis.speaking || (ls.stopAt > 0 && Date.now() > ls.stopAt))) {
        ls.active      = false;
        ls.currentOpen = 0;
        ls.targetOpen  = 0;
        ls.currentWide = 0;
        ls.targetWide  = 0;
        ls.stopAt      = 0;
      }

      if (ls.active && ls.chars.length > 0) {
        const CHAR_DURATION = 0.11;
        ls.charProgress += delta / CHAR_DURATION;
        if (ls.charProgress >= 1) {
          ls.charProgress = ls.charProgress - 1;
          ls.charIndex = (ls.charIndex + 1) % ls.chars.length;
        }
        const viseme  = getViseme(ls.chars[ls.charIndex]);
        ls.targetOpen = viseme.open;
        ls.targetWide = viseme.wide;
        const openSpd = ls.targetOpen > ls.currentOpen ? 18 : 8;
        ls.currentOpen += (ls.targetOpen - ls.currentOpen) * Math.min(1, delta * openSpd);
        ls.currentWide += (ls.targetWide - ls.currentWide) * Math.min(1, delta * 12);
        const wave = Math.sin(Date.now() * 0.012) * 0.03;
        lipOpen = Math.max(0, Math.min(0.9, ls.currentOpen + wave));
        lipWide = ls.currentWide;

      } else if (!ls.active && ls.currentOpen > 0) {
        ls.currentOpen *= 0.5;
        ls.currentWide *= 0.5;
        if (ls.currentOpen < 0.01) { ls.currentOpen = 0; ls.currentWide = 0; }
        lipOpen = ls.currentOpen;
        lipWide = ls.currentWide;
      }

      applyCurrentState(interpState, lipOpen, lipWide);

      // Blink
      const b = blinkRef.current;
      b.elapsed += delta;
      if (!b.isBlinking && b.elapsed >= b.nextBlink) {
        b.isBlinking = true; b.progress = 0; b.elapsed = 0;
        b.nextBlink  = 2 + Math.random() * 2;
      }
      if (b.isBlinking) {
        b.progress += delta / 0.08;
        let v;
        if      (b.progress < 1)   v = Math.sin(b.progress * Math.PI / 2);
        else if (b.progress < 1.4) v = 1;
        else if (b.progress < 2.4) v = 1 - Math.sin((b.progress - 1.4) * Math.PI / 2);
        else { v = 0; b.isBlinking = false; }
        for (const { mesh, blinkInfo } of eyeMeshesRef.current) {
          if (!mesh.morphTargetInfluences) continue;
          if      (blinkInfo.type === 'scale')    mesh.scale.y = 1 - v * 0.95;
          else if (blinkInfo.type === 'combined') mesh.morphTargetInfluences[blinkInfo.index] = v;
          else {
            if (blinkInfo.leftIdx  !== undefined) mesh.morphTargetInfluences[blinkInfo.leftIdx]  = v;
            if (blinkInfo.rightIdx !== undefined) mesh.morphTargetInfluences[blinkInfo.rightIdx] = v;
          }
        }
      }

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
      cancelAnimationFrame(animId);
      renderer.dispose();
      scene.clear();
      headBoneRef.current  = null;
      spineBoneRef.current = null;
      window.speechSynthesis?.cancel();
      if (watchdogRef.current) { clearInterval(watchdogRef.current); watchdogRef.current = null; }
    };
  }, [avatarUrl, applyCurrentState]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', ...containerStyle }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      {!loading && !error && currentExpr !== 'neutral' && (
        <div style={badgeStyle}>
          {{ happy:'😊', sad:'😢', angry:'😠', surprised:'😲', fearful:'😨', thinking:'🤔', empathetic:'🥺', disgusted:'🤢' }[currentExpr]}
        </div>
      )}
      {isSpeaking && (
        <div style={speakingBadgeStyle}>
          <SpeakingWave />
        </div>
      )}
      {loading && (
        <div style={overlayStyle}>
          <Spinner />
          <span style={{ marginTop: 10, fontSize: 14 }}>جاري التحميل...</span>
        </div>
      )}
      {error && <div style={{ ...overlayStyle, color: '#ff6b6b' }}>❌ {error}</div>}
    </div>
  );
};

const badgeStyle = {
  position: 'absolute', top: 12, right: 12,
  fontSize: 26, width: 42, height: 42,
  background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const speakingBadgeStyle = {
  position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
  background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
  borderRadius: 20, padding: '6px 14px',
  display: 'flex', alignItems: 'center', gap: 4,
};

const SpeakingWave = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 20 }}>
    {[0, 0.15, 0.3, 0.15, 0].map((delay, i) => (
      <div key={i} style={{
        width: 3, height: '100%',
        background: '#7fb3c8', borderRadius: 2,
        animation: `wave 0.6s ease-in-out ${delay}s infinite alternate`,
      }} />
    ))}
    <style>{`@keyframes wave { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }`}</style>
  </div>
);

const Spinner = () => (
  <div style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.15)', borderTop: '3px solid #7fb3c8', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }}>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const overlayStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  color: 'white', background: 'rgba(0,0,0,0.6)', padding: '20px 28px', borderRadius: '12px',
  display: 'flex', flexDirection: 'column', alignItems: 'center',
};

export default DoctorRobotAvatar;