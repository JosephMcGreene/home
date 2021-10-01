import "./scss/index.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import earthImg from "./img/earth.jpg";
import cloudsImg from "./img/dark-clouds-bg.jpg";
import logo from "./img/McGreene_Bee_Dark_BG.png";

// Set up Scene, Camera, and Renderer ==========
const scene = new THREE.Scene();
/**
 * Provides a camera from which to view
 * @param  {number} field of view
 * @param  {number} aspect ratio
 * @param  {number} view frustum
 * @param  {number} view frustum
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(4);

renderer.render(scene, camera);
// /Set up Scene, Camera, and Renderer ==========

// Lighting ==========
const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0, 0.5, 5);
const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(4, 4, 1);
const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.position.set(-4, 4, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight1, pointLight2, pointLight3, ambientLight);
// /Lighting ==========

// Helpers
// const lightHelper1 = new THREE.PointLightHelper(pointLight1);
// const lightHelper2 = new THREE.PointLightHelper(pointLight2);
// const lightHelper3 = new THREE.PointLightHelper(pointLight3);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper1, lightHelper2, lightHelper3);

// =============== 3D Objects ===============

// Logo Cube ==========
const logoTexture = new THREE.TextureLoader().load(logo);
const logoCube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: logoTexture })
);
logoCube.position.y = 0.22;
logoCube.position.z = -3;
scene.add(logoCube);
// /Logo Cube ==========

// Hexagon Torus ==========
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1.2, 0.3, 6, 6, Math.PI * 2),
  new THREE.MeshPhysicalMaterial({
    color: 0x232332,
    emissive: 0x232332,
    roughness: 0,
    metalness: 1,
    reflectivity: 1,
  })
);
torus.position.x = -2;
torus.position.z = -3;
// scene.add(torus);
// /Hexagon Torus ==========

// Earth ==========
const earthTexture = new THREE.TextureLoader().load(earthImg);
const earthSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
earthSphere.position.x = -2;
earthSphere.position.z = -3;
// scene.add(earthSphere);
// /Earth ==========

// =============== /3D Objects ===============

// Space Background ==========
const cloudTexture = new THREE.TextureLoader().load(cloudsImg);
scene.background = cloudTexture;
// /Space Background ==========

/**
 * generates a single star that is randmonly placed somewhere in the Scene
 */
function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(125));

  star.position.set(x, y, z);
  scene.add(star);
}
// Generates a field of 350 stars in the Scene
Array(350).fill().forEach(addStar);

/**
 * animates all of the objects placed in the Scene
 */
function animateObjects() {
  requestAnimationFrame(animateObjects);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.007;

  logoCube.rotation.y += 0.0075;
  logoCube.rotation.z += 0.0075;

  earthSphere.rotation.y += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}
animateObjects();

/**
 * moves the camera backward onscroll
 */
function handleOnScroll() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.02;
  camera.rotation.x = t * 0.00055;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = handleOnScroll;

{
  /* <article class="about-article">
          <p class="about-p">
            When Mark Zuckerberg was hard at work creating what would become one
            of the largest human networks ever created, I think it is safe to
            assume that he did not anticipate everything that it would become.
            He had no idea
            <a
              href="https://www.nytimes.com/2018/10/15/technology/myanmar-facebook-genocide.html"
              target="_blank"
              >Facebook would be used to spread hate or misinformation.</a
            >
            Similarly, no one at Google purposefully programmed the site to
            <a
              href="https://www.wsoaonline.com/does-your-internet-history-effect-google-search-results/"
              target="_blank"
              >trap users in their own bubbles of misinformation and
              distrust.</a
            >
            However, Facebook has become just such an avenue, and Google's
            personalized search results have indeed trapped many people in their
            own subjective and isolated realities.
          </p>
          <br />

          <p>
            So if no one <em>wanted</em> these eventualities to occur, how have
            they happened? I would argue that it is because it is almost
            impossible to fully anticipate every consequence a piece of
            programming will have. Computers simply do what their programmer
            instructs, so if the programmer does not implement measures for (or
            against) a certain outcome, then unintended results will occur, and
            those results might be unintentionally unethical.
          </p>
          <br />

          <p>
            What, then, makes for ethical programming? Unlike other human
            endeavors, where ethical practices come about from
            <em>refraining</em> from taking certain actions, such as a doctor's
            prerogative to do no harm or an athlete refraining from cheating,
            ethical programming requires proaction. It is not enough to
            <em>avoid</em> telling a computer to not insult or belittle its
            user, nor to simply <em>not</em> instruct a computer to not spread
            misinformation. If a computer is not instructed what to do in
            response to certain user inputs, then whether the programmer was
            trying to be ethical or not, then <em>the user</em> might very well
            decide to act unethically, and one must ask one's self: if the
            programmer was able to prevent that outcome, then whose
            responsibility is that outcome? There may be no concrete answer to
            this question, but I don't believe that to be an excuse for the
            programmer to not try to prevent it in the future, because
            <em>that</em> is ethical programming: to anticipate how one's
            technology is going to be used, and steer the user toward using it
            as intended.
          </p>
          <br />

          <p>
            Is this website, then, ethical? Do my projects steer the user toward
            using it as I intended? I would like to think so, but I invite you
            to join the campaign against unethical programming and help me
            program ethically. Get in contact with me if you think there is
            something I can do more ethically, and feel free to reach out if
            there is a project to be collaborated on! The techological world is
            not going to ethicize itself.
          </p>
          <br />

          <span>- Joseph McGreene</span>
        </article>
      </section>

      <section id="projectsSection">
        <h2 class="projects-h2">Projects</h2>

        <h3 class="2048-h3">
          <a href="http://young-crag-41251.herokuapp.com/" target="_blank"
            >2048<sup>2</sup></a
          >
        </h3>

        <article class="2048-article">
          <p class="2048-p">
            After a few months of learning JavaScript, I decided I wanted to
            strike out on my own an build my own app from scratch. My
            educational background is in music, so I decided to create an app
            that would help songwriters to come up with chord progressions for
            their music.
            <a
              href="https://josephmcgreene.github.io/chord-suggestions/"
              target="_blank"
              ><em>Chord Suggestions</em></a
            >
            was born. So far, I am quite proud of it. The most difficult aspect
            was figuring out how to use JavaScript to establish the key of a
            piece of music that the user inputs. Once that code was written, I
            realized that the rest of the programming would primarily entail
            creating an intuitive UI for the generation of the chord suggestions
            themselves. "Ah-ha!" I thought to myself. "This is a wonderful
            opportunity for me to learn React!" I am in the midst of that
            endeavor likely as you read this, and Chord Suggestions will become
            a React app once I am confident in my understanding of the
            framework/library.
          </p>
        </article>

        <h3 class="lets-roll-h3">
          <a href="https://josephmcgreene.github.io/lets-roll/" target="_blank"
            >Let's Roll</a
          >
        </h3>

        <article class="lets-roll-article">
          <p class="lets-roll-p">
            <a
              href="https://josephmcgreene.github.io/lets-roll/"
              target="_blank"
              ><em>Let's Roll</em></a
            >
            came about after I joined my first ever Dungeons and Dragons group.
            I knew there are dozens of completely adequate dice rolling apps out
            there, but I wanted to create my own, mostly to prove to myself that
            I can do it.
          </p>
        </article>
      </section>

      <section id="contactSection">
        <h2 class="contact-h2">Get in Touch</h2>

        <address>
          <article class="contact-article">
            <ul class="contact-links">
              <li class="contact-li">
                <a href="mailto:josephorianmcgreene@gmail.com">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="envelope-open"
                    class="svg-inline--fa fa-envelope-open fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    height="35"
                    width="35"
                  >
                    <path
                      fill="currentColor"
                      d="M512 464c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V200.724a48 48 0 0 1 18.387-37.776c24.913-19.529 45.501-35.365 164.2-121.511C199.412 29.17 232.797-.347 256 .003c23.198-.354 56.596 29.172 73.413 41.433 118.687 86.137 139.303 101.995 164.2 121.512A48 48 0 0 1 512 200.724V464zm-65.666-196.605c-2.563-3.728-7.7-4.595-11.339-1.907-22.845 16.873-55.462 40.705-105.582 77.079-16.825 12.266-50.21 41.781-73.413 41.43-23.211.344-56.559-29.143-73.413-41.43-50.114-36.37-82.734-60.204-105.582-77.079-3.639-2.688-8.776-1.821-11.339 1.907l-9.072 13.196a7.998 7.998 0 0 0 1.839 10.967c22.887 16.899 55.454 40.69 105.303 76.868 20.274 14.781 56.524 47.813 92.264 47.573 35.724.242 71.961-32.771 92.263-47.573 49.85-36.179 82.418-59.97 105.303-76.868a7.998 7.998 0 0 0 1.839-10.967l-9.071-13.196z"
                    ></path>
                  </svg>
                  <!-- https://fontawesome.com/license -->
                  <span>josephorianmcgreene@gmail.com</span>
                </a>
              </li>
              <li class="contact-li">
                <a href="tel:+12089917006">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="phone-square"
                    class="svg-inline--fa fa-phone-square fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="35"
                    width="35"
                  >
                    <path
                      fill="currentColor"
                      d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM94 416c-7.033 0-13.057-4.873-14.616-11.627l-14.998-65a15 15 0 0 1 8.707-17.16l69.998-29.999a15 15 0 0 1 17.518 4.289l30.997 37.885c48.944-22.963 88.297-62.858 110.781-110.78l-37.886-30.997a15.001 15.001 0 0 1-4.289-17.518l30-69.998a15 15 0 0 1 17.16-8.707l65 14.998A14.997 14.997 0 0 1 384 126c0 160.292-129.945 290-290 290z"
                    ></path>
                  </svg>
                  <!-- https://fontawesome.com/license -->
                  <span>(208) 991-7006</span>
                </a>
              </li>
            </ul>
            <br />
            <p class="contact-p">
              If you want to learn more, collaborate on a project with me, or
              just chat about life, feel free to reach out. The best way to
              contact me is through email, but if a phone call or a text is more
              your speed, you can also reach me by phone. However, due to the
              outrageous increase in robocalls I receive as of late, I do not
              answer the phone if I do not recognize the number calling me. But
              do leave a voicemail, and I will return your call within the next
              business day.
            </p>
            <br />
            <p class="contact-p">
              You can also see what I'm up to around the web:
            </p>
            <br />
            <ul class="contact-links">
              <li>
                <a href="https://github.com/JosephMcGreene" target="_blank">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="github"
                    class="svg-inline--fa fa-github fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    height="70"
                    width="70"
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    ></path>
                  </svg>
                  <!-- https://fontawesome.com/license -->
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/joseph-mcgreene/"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="linkedin"
                    class="svg-inline--fa fa-linkedin fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="70"
                    width="70"
                  >
                    <path
                      fill="currentColor"
                      d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                    ></path>
                  </svg>
                  <!-- https://fontawesome.com/license -->
                </a>
              </li>
              <li>
                <a href="https://dev.to/josephmcgreene" target="_blank">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="dev"
                    class="svg-inline--fa fa-dev fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="70"
                    width="70"
                  >
                    <path
                      fill="currentColor"
                      d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"
                    ></path>
                  </svg>
                  <!-- https://fontawesome.com/license -->
                </a>
              </li>
            </ul>
          </article>
        </address>
      </section> */
}
