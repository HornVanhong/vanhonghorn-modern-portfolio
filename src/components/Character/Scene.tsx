import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
};

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      let isMounted = true;
      let cleanupCharTimeline: (() => void) | null = null;
      let cleanupAllTimeline: (() => void) | null = null;

      const finishWithoutWebGL = () => {
        setLoading(100);
        cleanupAllTimeline = setAllTimeline();
      };

      if (!hasWebGL()) {
        finishWithoutWebGL();
        return () => {
          isMounted = false;
          if (cleanupAllTimeline) cleanupAllTimeline();
        };
      }

      const rect = canvasDiv.current.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: window.devicePixelRatio <= 2,
          powerPreference: "high-performance",
        });
      } catch (error) {
        console.warn("WebGL unavailable, skipping character scene.", error);
        finishWithoutWebGL();
        return () => {
          isMounted = false;
          if (cleanupAllTimeline) cleanupAllTimeline();
        };
      }
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);
      renderer.domElement.addEventListener(
        "webglcontextlost",
        (event) => {
          event.preventDefault();
          setLoading(100);
        },
        false
      );

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let activeCharacter: THREE.Object3D | null = null;
      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      const onResize = () => {
        handleResize(renderer, camera, canvasDiv, activeCharacter);
      };
      window.addEventListener("resize", onResize);

      loadCharacter().then((gltf) => {
        if (!isMounted) return;
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          activeCharacter = gltf.scene;
          scene.add(activeCharacter);
          headBone = activeCharacter.getObjectByName("spine006") || null;
          screenLight = activeCharacter.getObjectByName("screenlight") || null;

          cleanupCharTimeline = setCharTimeline(activeCharacter, camera);
          cleanupAllTimeline = setAllTimeline();

          progress.loaded().then(() => {
            if (!isMounted) return;
            setTimeout(() => {
              if (!isMounted) return;
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: ReturnType<typeof setTimeout> | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        isMounted = false;
        cancelAnimationFrame(animationFrameId);
        if (cleanupCharTimeline) cleanupCharTimeline();
        if (cleanupAllTimeline) cleanupAllTimeline();
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", onResize);
        if (canvasDiv.current?.contains(renderer.domElement)) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
