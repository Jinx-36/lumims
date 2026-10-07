import type { Lesson, LessonSource } from '../../types'

const sources = {
  panasonicGh5: {
    title: 'Features and Specifications — LUMIX G-Series DC-GH5',
    publisher: 'Panasonic',
    url: 'https://help.na.panasonic.com/answers/features-and-specifications-lumix-g-series-dc-gh5/',
  },
  nikonExposure: {
    title: 'A Basic Look at the Basics of Exposure',
    publisher: 'Nikon Imaging USA',
    url: 'https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/a-basic-look-at-the-basics-of-exposure',
  },
  nikonAperture: {
    title: 'Understanding Maximum Aperture',
    publisher: 'Nikon Imaging USA',
    url: 'https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/understanding-maximum-aperture',
  },
  nikonShutter: {
    title: 'Understanding Shutter Speed: Capturing Time in Photography',
    publisher: 'Nikon Imaging USA',
    url: 'https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/understanding-shutter-speed',
  },
  nikonLight: {
    title: 'Understanding Light',
    publisher: 'Nikon School',
    url: 'https://static.nikonusa.com/pdf/nikonschool/sun.pdf',
  },
  canonExposure: {
    title: 'Exposure Triangle Basics: Aperture, Shutter Speed and ISO',
    publisher: 'Canon Australia',
    url: 'https://www.canon.com.au/get-inspired/exposure-triangle-basics',
  },
  adobeTone: {
    title: 'How to adjust image tone and color in Lightroom Classic',
    publisher: 'Adobe',
    url: 'https://helpx.adobe.com/lightroom-classic/desktop/process-and-develop-photos/image-tone-color.html',
  },
} as const satisfies Record<string, LessonSource>

export const photographyBasicsLessons = [
  {
    id: 'topic-01-lesson-01',
    slug: 'what-is-photography',
    title: 'What Is Photography?',
    summary: 'Understand photography as the deliberate recording and interpretation of light.',
    order: 1,
    estimatedMinutes: 5,
    sections: [
      {
        id: 'what-is-photography-introduction',
        kind: 'text',
        paragraphs: [
          'Photography begins with light. A scene emits light, reflects light, or both; your camera records part of that light as an image. The subject matters, but without light there is nothing for the camera to record.',
          'Pressing the shutter is only the final decision. Before it, you choose where to stand, what to include, when to make the frame, and how bright or dark you want the result to feel. Those choices are why two people can photograph the same scene and make different pictures.',
        ],
      },
      {
        id: 'what-is-photography-light-path',
        kind: 'media',
        src: '/images/lessons/photography-basics/photography-light-path.svg',
        mobileSrc: '/images/lessons/photography-basics/photography-light-path-mobile.svg',
        alt: 'Flow diagram showing a scene, light, lens, sensor, and processed image in sequence.',
        caption: 'A photograph starts as scene light, then becomes sensor data and finally an image file.',
        width: 1200,
        height: 620,
      },
      {
        id: 'what-is-photography-control',
        kind: 'theory',
        title: 'Control makes a photograph intentional',
        paragraphs: [
          'A technically usable image is not automatically the best image. A bright photograph can still be distracting; a darker photograph can be exactly right if it protects a mood, a silhouette, or a bright highlight.',
          'Learning settings gives you choices. You can decide whether movement looks frozen or blurred, whether a background is more or less in focus, and whether the camera should prioritize brightness or image quality. Topic 1 gives you the mental model; later topics teach each control in depth.',
        ],
      },
      {
        id: 'what-is-photography-tip',
        kind: 'tip',
        content: 'When you review a photograph, ask two questions: “Where is the light coming from?” and “What did I choose to emphasize?” Those questions are more useful than asking only whether the camera made it bright enough.',
      },
      {
        id: 'what-is-photography-exercise',
        kind: 'exercise',
        title: 'Make two different pictures of one object',
        instructions: 'Choose an ordinary object near a window or lamp. Make one frame from where you first stand, then move so the light reaches the object from a noticeably different direction.',
        steps: [
          'Keep the object the same, but change your viewpoint or its direction relative to the light.',
          'Make one photograph in each position.',
          'Compare the shadows, background, and the part of the object your eye notices first.',
        ],
        expectedObservation: 'The object may be unchanged, but the pattern of light and shadow can make the two photographs feel meaningfully different.',
      },
      {
        id: 'what-is-photography-takeaways',
        kind: 'key-takeaways',
        items: [
          'Photography records light from a scene as an image.',
          'A photograph is shaped by subject, light, camera settings, and photographer decisions.',
          'Technical settings are tools for creative choices, not an end in themselves.',
          'Looking for the light is the first habit to build.',
        ],
      },
    ],
    sources: [sources.nikonExposure],
  },
  {
    id: 'topic-01-lesson-02',
    slug: 'how-a-camera-works',
    title: 'How a Camera Works',
    summary: 'Follow light through a lens, aperture, shutter, sensor, processor, and memory card.',
    order: 2,
    estimatedMinutes: 7,
    sections: [
      {
        id: 'how-camera-works-introduction',
        kind: 'text',
        paragraphs: [
          'A digital camera is a controlled light-measuring system. Light from the scene travels through the lens. The aperture controls the size of the opening in that lens, and the shutter controls how long the sensor is exposed to the light.',
          'The sensor converts the light it receives into data. The camera then processes that data and writes an image file to the memory card. A JPEG is processed in-camera; a RAW file keeps more of the sensor data for later processing.',
        ],
      },
      {
        id: 'how-camera-works-diagram',
        kind: 'media',
        src: '/images/lessons/photography-basics/camera-light-path.svg',
        mobileSrc: '/images/lessons/photography-basics/camera-light-path-mobile.svg',
        alt: 'Simplified cross-section diagram of a mirrorless camera showing light from a subject through the lens, aperture, shutter, sensor, processor, and memory card.',
        caption: 'The controls near the front of the path affect the light that reaches the sensor; processing happens after capture.',
        width: 1200,
        height: 680,
      },
      {
        id: 'how-camera-works-mirrorless',
        kind: 'theory',
        title: 'What “mirrorless” means for your GH5',
        paragraphs: [
          'Panasonic specifies the DC-GH5 as a digital single-lens mirrorless camera with a Live MOS sensor. Instead of an optical mirror-and-prism viewing path, it provides an OLED Live View Finder and a rear monitor for composing the scene.',
          'That live view is useful because it gives you a screen or viewfinder for framing and reviewing. It is still important to judge the recorded photograph itself: a screen can look brighter or darker depending on its brightness and the room around you.',
        ],
      },
      {
        id: 'how-camera-works-gh5-orientation',
        kind: 'gh5-setup',
        title: 'Orient yourself with the GH5',
        settings: [
          { label: 'Camera type', value: 'Digital single-lens mirrorless camera' },
          { label: 'Image sensor', value: 'Live MOS sensor' },
          { label: 'Viewing options', value: 'OLED Live View Finder and rear monitor' },
        ],
        steps: [
          'With the camera off, locate the lens, the rear monitor, the viewfinder, and the memory-card door.',
          'Turn the camera on with the lens cap removed and frame a normal indoor scene; do not point the camera at the sun.',
          'Notice that the scene is shown electronically on the monitor or viewfinder before you make a photograph.',
        ],
        note: 'This is an orientation exercise, not a menu-setting exercise. Detailed GH5 controls come in Topic 2.',
      },
      {
        id: 'how-camera-works-exercise',
        kind: 'exercise',
        title: 'Trace the light path',
        instructions: 'Use the diagram and your camera to explain the path of light out loud before you take one photograph.',
        steps: [
          'Point to the lens and name it as the first major optical element.',
          'Name aperture and shutter as controls that affect capture before the sensor records the scene.',
          'Take one photo, then find the resulting image in playback to connect capture with storage.',
        ],
        expectedObservation: 'You should be able to describe the route as scene → lens → aperture/shutter → sensor → processing → memory card.',
      },
      {
        id: 'how-camera-works-takeaways',
        kind: 'key-takeaways',
        items: [
          'The lens directs scene light toward the sensor.',
          'Aperture and shutter affect how light reaches the sensor before processing.',
          'The sensor records data; the camera processes it into image files and stores them on the card.',
          'The GH5 is mirrorless and provides electronic viewing through its Live View Finder and monitor.',
        ],
      },
    ],
    sources: [sources.panasonicGh5, sources.nikonExposure],
  },
  {
    id: 'topic-01-lesson-03',
    slug: 'understanding-light',
    title: 'Understanding Light',
    summary: 'Learn how quantity, direction, quality, color, and distance change a photograph.',
    order: 3,
    estimatedMinutes: 7,
    sections: [
      {
        id: 'understanding-light-introduction',
        kind: 'text',
        paragraphs: [
          'The camera does not see a subject in isolation. It records the light falling on that subject, along with reflected light from the world around it. Change the light and the same face, cup, or tree can look completely different.',
          'For a beginner, five useful qualities are quantity, direction, quality, color, and distance. You do not need to memorize them as a formula; use them as questions you can ask before taking a picture.',
        ],
      },
      {
        id: 'understanding-light-diagram',
        kind: 'media',
        src: '/images/lessons/photography-basics/light-quality-and-direction.svg',
        mobileSrc: '/images/lessons/photography-basics/light-quality-and-direction-mobile.svg',
        alt: 'Comparison diagram of a small direct source producing a sharp-edged shadow and a larger diffused source producing a gradual shadow transition.',
        caption: 'A source that appears small from the subject tends to make harder shadow edges; a larger or diffused source tends to make softer transitions.',
        width: 1200,
        height: 680,
      },
      {
        id: 'understanding-light-qualities',
        kind: 'theory',
        title: 'Read the light before you change a setting',
        paragraphs: [
          'Quantity is how much light is available. Direction is where it comes from: front light can flatten texture, side light can reveal texture, and back light can turn a subject into a silhouette. Quality describes the transition from light to shadow. Direct midday sun often makes hard, defined shadows; a cloudy sky or a large window can make softer transitions.',
          'Color changes with the source. Daylight, household lamps, and sunset can have different color casts. Distance also matters: moving a light or subject changes both brightness and the apparent size of the source. A window close to a small object can behave like a large, soft source.',
        ],
      },
      {
        id: 'understanding-light-tip',
        kind: 'tip',
        content: 'Cloudy weather is not “bad light.” The cloud layer turns the sky into a broad source, often making soft shadows that are useful for portraits and close-up details.',
      },
      {
        id: 'understanding-light-exercise',
        kind: 'exercise',
        title: 'Photograph one subject in two kinds of light',
        instructions: 'Choose a textured object such as a mug, plant, shoe, or face. Photograph it first in direct light and then near a window or under an overcast sky.',
        steps: [
          'Keep the camera position and subject as similar as practical.',
          'Look for the edge of the shadow under the subject or beside a raised detail.',
          'Compare where the texture is easiest to see and whether the scene feels softer or more dramatic.',
        ],
        expectedObservation: 'The direct-light frame should usually show more defined shadow edges; the softer-light frame should show a gentler transition from bright to dark.',
      },
      {
        id: 'understanding-light-takeaways',
        kind: 'key-takeaways',
        items: [
          'Light quantity, direction, quality, color, and distance all affect the picture.',
          'Direction changes which surfaces are bright and where shadows fall.',
          'Hard and soft describe shadow transitions, not whether light is good or bad.',
          'Observe the light first; then decide which camera setting or position helps you use it.',
        ],
      },
    ],
    sources: [sources.nikonLight, sources.adobeTone],
  },
  {
    id: 'topic-01-lesson-04',
    slug: 'exposure-explained',
    title: 'Exposure Explained',
    summary: 'Understand exposure as the capture of light and learn why clipping and intent matter.',
    order: 4,
    estimatedMinutes: 7,
    sections: [
      {
        id: 'exposure-explained-introduction',
        kind: 'text',
        paragraphs: [
          'Exposure describes the light a camera records for a photograph. Aperture and shutter duration directly affect how much light reaches the sensor. ISO is part of the practical exposure-control set because it changes how the camera treats the recorded signal for a chosen brightness, but it does not open the lens or lengthen the exposure.',
          'A picture can be underexposed, overexposed, or intentionally placed somewhere between. Those labels are useful warnings, not universal artistic rules. A silhouette may be deliberately dark; a pale background may be deliberately bright. The question is whether important areas of your picture have the brightness and detail you intend.',
        ],
      },
      {
        id: 'exposure-explained-comparison',
        kind: 'media',
        src: '/images/lessons/photography-basics/exposure-comparison.svg',
        mobileSrc: '/images/lessons/photography-basics/exposure-comparison-mobile.svg',
        alt: 'Three versions of the same landscape: underexposed and dark, intentionally exposed with visible detail, and overexposed with a clipped white sky.',
        caption: 'Exposure is not simply “make everything bright.” It is a decision about the recorded tonal range and the details you want to preserve.',
        width: 1200,
        height: 680,
      },
      {
        id: 'exposure-explained-clipping',
        kind: 'theory',
        title: 'Brightness and detail are related, but not identical',
        paragraphs: [
          'A bright preview on the rear screen does not automatically mean a photograph is overexposed, and a dark preview does not automatically mean it is underexposed. Screen brightness, viewing environment, and processing all affect what you see after capture.',
          'Clipping is more concrete. When a highlight is recorded as pure white or a shadow as pure black, it can contain no tonal detail in that direction. Some specular highlights, such as a small glint on metal, may be acceptable. Losing detail in a person’s face or an important bright sky area is often not.',
        ],
      },
      {
        id: 'exposure-explained-warning',
        kind: 'warning',
        content: 'Do not judge exposure only by the overall brightness of the screen. Look at the important subject, the brightest important area, and the darkest important area before deciding what to change.',
      },
      {
        id: 'exposure-explained-exercise',
        kind: 'exercise',
        title: 'Make a three-frame exposure comparison',
        instructions: 'Photograph the same still scene three times: an automatic or baseline frame, a deliberately darker frame, and a deliberately brighter frame. Use only controls you already understand or your camera manual.',
        steps: [
          'Include a bright area and a darker area, such as a window beside an object.',
          'Keep the framing unchanged for all three frames.',
          'Review each frame and identify which details disappear first as the image gets darker or brighter.',
        ],
        expectedObservation: 'The darkest and brightest versions should show less useful detail in at least one important area than the baseline frame.',
      },
      {
        id: 'exposure-explained-takeaways',
        kind: 'key-takeaways',
        items: [
          'Exposure concerns the light recorded for the photograph, not only how bright a screen looks afterward.',
          'Aperture and shutter duration directly change captured light; ISO is a related signal/output setting.',
          'Intent matters: there can be more than one pleasing exposure for a scene.',
          'Clipping can remove tonal detail in highlights or shadows.',
        ],
      },
    ],
    sources: [sources.canonExposure, sources.adobeTone],
  },
  {
    id: 'topic-01-lesson-05',
    slug: 'the-exposure-triangle',
    title: 'The Exposure Triangle',
    summary: 'Use aperture, shutter speed, and ISO as a practical model for balancing brightness and visual trade-offs.',
    order: 5,
    estimatedMinutes: 8,
    sections: [
      {
        id: 'exposure-triangle-introduction',
        kind: 'text',
        paragraphs: [
          'The exposure triangle is a useful teaching model for three settings you balance while making a photograph: aperture, shutter speed, and ISO. It is useful because changing one setting often requires a response from another if you want a similar image brightness.',
          'The triangle is not a claim that all three settings do the same physical job. Aperture changes the lens opening. Shutter speed changes the duration of capture. ISO changes the camera’s signal/output behavior for a given capture. They are linked in practice, but they create different trade-offs.',
        ],
      },
      {
        id: 'exposure-triangle-diagram',
        kind: 'media',
        src: '/images/lessons/photography-basics/exposure-triangle.svg',
        mobileSrc: '/images/lessons/photography-basics/exposure-triangle-mobile.svg',
        alt: 'Triangle diagram connecting aperture, shutter speed, and ISO, with each control’s exposure role and creative consequence.',
        caption: 'Use the triangle as a decision model: preserve a desired brightness while choosing the visual effect that matters most.',
        width: 1200,
        height: 720,
      },
      {
        id: 'exposure-triangle-tradeoffs',
        kind: 'theory',
        title: 'Equal brightness can still make different photographs',
        paragraphs: [
          'A wider aperture can admit more light and often produces a shallower depth of field. A longer shutter duration can admit more light but can record movement as blur. A higher ISO can let you use a shorter exposure or smaller aperture for similar brightness, but it may bring more visible noise and reduce tonal latitude depending on the camera and conditions.',
          'For example, f/4 at 1/125 second and f/5.6 at 1/60 second are approximately equivalent in captured light: closing aperture by one stop is balanced by roughly doubling the exposure duration. The framing may have the same brightness, but depth of field and motion rendering can differ.',
        ],
      },
      {
        id: 'exposure-triangle-tip',
        kind: 'tip',
        content: 'Start with the effect you care about most. For a moving subject, choose a shutter speed that suits the motion. For a portrait background, consider aperture. Then use the other controls to bring the exposure where you want it.',
      },
      {
        id: 'exposure-triangle-exercise',
        kind: 'exercise',
        title: 'Plan two equivalent exposures',
        instructions: 'Choose a still subject in steady light. On paper or in your phone notes, start with a possible setting such as f/4, 1/125 second, ISO 400 and plan two one-stop compensations.',
        steps: [
          'Close aperture one stop from f/4 to f/5.6; identify the shutter change that keeps captured light similar.',
          'Make shutter speed one stop faster from 1/125 to 1/250 second; identify the ISO change that aims for a similar brightness.',
          'If you know how to set these controls safely, test one pair on your GH5 and compare the result.',
        ],
        expectedObservation: 'Equivalent brightness does not mean identical visual results: aperture, shutter duration, and ISO each bring a separate consequence.',
      },
      {
        id: 'exposure-triangle-takeaways',
        kind: 'key-takeaways',
        items: [
          'The exposure triangle links aperture, shutter speed, and ISO for practical decision-making.',
          'Aperture and shutter duration directly control captured light.',
          'ISO helps reach a chosen brightness but can affect noise and tonal latitude.',
          'Equivalent exposures can have different depth of field, motion rendering, and image-quality trade-offs.',
        ],
      },
    ],
    sources: [sources.nikonExposure, sources.nikonAperture, sources.nikonShutter, sources.canonExposure],
  },
  {
    id: 'topic-01-lesson-06',
    slug: 'understanding-stops',
    title: 'Understanding Stops',
    summary: 'Use stops to reason about doubling and halving exposure relationships.',
    order: 6,
    estimatedMinutes: 6,
    sections: [
      {
        id: 'understanding-stops-introduction',
        kind: 'text',
        paragraphs: [
          'A stop is a convenient way to describe a doubling or halving relationship. One stop more exposure means twice the light contribution from aperture or shutter duration. One stop less means half. Stops let you compare changes across controls without doing a new calculation every time.',
          'Cameras often show conventional rounded values. From 1/125 second to 1/60 second is treated as about one stop more exposure; exact doubling of 1/125 is 1/62.5, but 1/60 is the familiar displayed value. From 1/125 to 1/250 is one stop less exposure.',
        ],
      },
      {
        id: 'understanding-stops-diagram',
        kind: 'media',
        src: '/images/lessons/photography-basics/stop-ladder.svg',
        mobileSrc: '/images/lessons/photography-basics/stop-ladder-mobile.svg',
        alt: 'Three stop ladders showing aperture values f 2.8 through f 8, shutter speeds one sixtieth through one five-hundredth second, and ISO 100 through 800.',
        caption: 'Each adjacent full-stop step represents a doubling or halving relationship, even though aperture f-numbers themselves do not double.',
        width: 1200,
        height: 760,
      },
      {
        id: 'understanding-stops-aperture',
        kind: 'theory',
        title: 'Why aperture numbers look unusual',
        paragraphs: [
          'A common full-stop aperture sequence is f/2.8, f/4, f/5.6, f/8, and f/11. Moving from f/2.8 to f/4 halves the opening area and therefore halves the light contribution: one stop less. The f-number rises by roughly the square root of two because it describes a ratio related to lens focal length and opening diameter, not the opening area directly.',
          'ISO is also commonly discussed in stops. Doubling ISO from 100 to 200 is a one-stop increase in the camera’s exposure calculation: with aperture and shutter unchanged, the camera produces a brighter result. To keep a similar brightness, you can usually halve the exposure duration or reduce the aperture by one stop. Higher ISO can bring more visible noise, so it is a trade-off rather than free brightness.',
        ],
      },
      {
        id: 'understanding-stops-exercise',
        kind: 'exercise',
        title: 'Find the one-stop neighbors',
        instructions: 'Use the stop ladder, then check the exposure values your GH5 displays in a still-photo mode or in its manual. You are only identifying neighboring values; do not change a setting unless you are comfortable doing so.',
        steps: [
          'Write the one-stop brighter and darker shutter values around 1/125 second.',
          'Write the next two full-stop apertures after f/4 in the direction of less light.',
          'Write the next two ISO values after ISO 200 in the direction of a higher ISO setting.',
        ],
        expectedObservation: 'You should see a consistent doubling or halving pattern in time, opening area, or ISO setting even though the numbers are formatted differently.',
      },
      {
        id: 'understanding-stops-warning',
        kind: 'warning',
        content: 'Do not treat the number after the slash in a shutter speed as a normal whole number. A larger denominator means a shorter exposure: 1/250 second is less time, and less captured light, than 1/125 second.',
      },
      {
        id: 'understanding-stops-takeaways',
        kind: 'key-takeaways',
        items: [
          'One stop is a doubling or halving relationship.',
          '1/125 to about 1/60 second is one stop more exposure; 1/125 to 1/250 is one stop less.',
          'Full-stop apertures advance by roughly a square-root-of-two ratio because aperture is based on a ratio, not opening area.',
          'Doubling ISO is treated as a one-stop increase, with image-quality trade-offs to consider.',
        ],
      },
    ],
    sources: [sources.nikonExposure, sources.nikonAperture, sources.canonExposure],
  },
] as const satisfies readonly Lesson[]
