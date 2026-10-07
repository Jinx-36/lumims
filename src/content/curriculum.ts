import type { Lesson, Topic } from '../types'
import { photographyBasicsLessons } from './topics/photography-basics'

type LessonSeed = readonly [id: string, slug: string, title: string, estimatedMinutes: number]
export interface CurriculumLesson { topic: Topic; lesson: Lesson }
export interface LessonPosition { index: number; total: number }

const makeLessons = (seeds: readonly LessonSeed[]): readonly Lesson[] =>
  seeds.map(([id, slug, title, estimatedMinutes], index) => ({ id, slug, title, estimatedMinutes, order: index + 1, sections: [] }))

const makeTopic = (id: string, slug: string, title: string, description: string, order: number, lessons: readonly LessonSeed[]): Topic =>
  ({ id, slug, title, description, order, lessons: makeLessons(lessons) })

const makeTopicWithLessons = (
  id: string,
  slug: string,
  title: string,
  description: string,
  order: number,
  lessons: readonly Lesson[],
): Topic => ({ id, slug, title, description, order, lessons })

export const curriculum = [
  makeTopicWithLessons('topic-01', 'photography-basics', 'Photography Basics', 'Build a clear foundation for how cameras turn light into photographs.', 1, photographyBasicsLessons),
  makeTopic('topic-02', 'getting-to-know-the-lumix-gh5', 'Getting to Know the Lumix GH5', 'Get comfortable with the GH5 body, controls, modes, and menus.', 2, [
    ['topic-02-lesson-01','gh5-overview','GH5 Overview',6], ['topic-02-lesson-02','buttons-and-dials','Buttons and Dials',8], ['topic-02-lesson-03','understanding-the-screen-and-viewfinder','Understanding the Screen and Viewfinder',6], ['topic-02-lesson-04','navigating-the-gh5-menus','Navigating the GH5 Menus',8], ['topic-02-lesson-05','shooting-modes-p-a-s-and-m','Shooting Modes: P, A, S and M',8], ['topic-02-lesson-06','custom-modes-c1-c2-and-c3','Custom Modes C1, C2 and C3',6],
  ]),
  makeTopic('topic-03', 'understanding-your-lens', 'Understanding Your Lens', 'Learn how your 12–42 mm lens changes framing, focus, and perspective.', 3, [
    ['topic-03-lesson-01','what-a-lens-does','What a Lens Does',5], ['topic-03-lesson-02','understanding-focal-length','Understanding Focal Length',7], ['topic-03-lesson-03','understanding-your-12-42-mm-range','Understanding Your 12–42 mm Range',7], ['topic-03-lesson-04','wide-angle-vs-telephoto','Wide Angle vs Telephoto',7], ['topic-03-lesson-05','aperture-and-the-lens','Aperture and the Lens',6], ['topic-03-lesson-06','minimum-focus-distance','Minimum Focus Distance',5], ['topic-03-lesson-07','optical-vs-digital-zoom','Optical vs Digital Zoom',6],
  ]),
  makeTopic('topic-04', 'aperture', 'Aperture', 'Use aperture to control brightness, depth of field, and background appearance.', 4, [
    ['topic-04-lesson-01','what-is-aperture','What Is Aperture?',6], ['topic-04-lesson-02','understanding-f-numbers','Understanding f-numbers',7], ['topic-04-lesson-03','aperture-and-brightness','Aperture and Brightness',6], ['topic-04-lesson-04','aperture-and-depth-of-field','Aperture and Depth of Field',8], ['topic-04-lesson-05','background-blur','Background Blur',7], ['topic-04-lesson-06','choosing-the-right-aperture','Choosing the Right Aperture',7],
  ]),
  makeTopic('topic-05', 'shutter-speed', 'Shutter Speed', 'Control time in your images, from crisp action to deliberate motion blur.', 5, [
    ['topic-05-lesson-01','what-is-shutter-speed','What Is Shutter Speed?',6], ['topic-05-lesson-02','shutter-speed-and-exposure','Shutter Speed and Exposure',6], ['topic-05-lesson-03','freezing-motion','Freezing Motion',7], ['topic-05-lesson-04','creating-motion-blur','Creating Motion Blur',7], ['topic-05-lesson-05','camera-shake','Camera Shake',6], ['topic-05-lesson-06','choosing-shutter-speed','Choosing Shutter Speed',7],
  ]),
  makeTopic('topic-06', 'iso', 'ISO', 'Learn how ISO affects brightness and image noise.', 6, [
    ['topic-06-lesson-01','what-is-iso','What Is ISO?',5], ['topic-06-lesson-02','iso-and-brightness','ISO and Brightness',6], ['topic-06-lesson-03','iso-and-image-noise','ISO and Image Noise',7], ['topic-06-lesson-04','native-and-extended-iso','Native and Extended ISO',6], ['topic-06-lesson-05','auto-iso','Auto ISO',6], ['topic-06-lesson-06','choosing-the-right-iso','Choosing the Right ISO',7],
  ]),
  makeTopic('topic-07', 'mastering-exposure', 'Mastering Exposure', 'Combine aperture, shutter speed, and ISO while reading exposure tools.', 7, [
    ['topic-07-lesson-01','combining-aperture-shutter-and-iso','Combining Aperture, Shutter and ISO',8], ['topic-07-lesson-02','reading-the-exposure-meter','Reading the Exposure Meter',6], ['topic-07-lesson-03','exposure-compensation','Exposure Compensation',6], ['topic-07-lesson-04','histogram','Histogram',7], ['topic-07-lesson-05','highlight-warnings','Highlight Warnings',5], ['topic-07-lesson-06','metering-modes','Metering Modes',6], ['topic-07-lesson-07','shooting-in-manual-mode','Shooting in Manual Mode',8],
  ]),
  makeTopic('topic-08', 'focus', 'Focus', 'Choose and control GH5 focus tools for still and moving subjects.', 8, [
    ['topic-08-lesson-01','how-autofocus-works','How Autofocus Works',6], ['topic-08-lesson-02','af-s-vs-af-c','AF-S vs AF-C',6], ['topic-08-lesson-03','manual-focus','Manual Focus',7], ['topic-08-lesson-04','gh5-focus-modes','GH5 Focus Modes',7], ['topic-08-lesson-05','focus-areas','Focus Areas',6], ['topic-08-lesson-06','face-and-eye-detection','Face and Eye Detection',6], ['topic-08-lesson-07','tracking-subjects','Tracking Subjects',7], ['topic-08-lesson-08','focus-peaking','Focus Peaking',6], ['topic-08-lesson-09','back-button-focus','Back-Button Focus',6],
  ]),
  makeTopic('topic-09', 'white-balance-and-color', 'White Balance & Color', 'Make color look natural or intentionally creative with white balance and tint.', 9, [
    ['topic-09-lesson-01','what-is-white-balance','What Is White Balance?',6], ['topic-09-lesson-02','color-temperature-and-kelvin','Color Temperature and Kelvin',7], ['topic-09-lesson-03','auto-white-balance','Auto White Balance',5], ['topic-09-lesson-04','gh5-white-balance-presets','GH5 White Balance Presets',6], ['topic-09-lesson-05','custom-white-balance','Custom White Balance',7], ['topic-09-lesson-06','tint','Tint',5], ['topic-09-lesson-07','creative-color-choices','Creative Color Choices',7],
  ]),
  makeTopic('topic-10', 'image-quality-and-file-formats', 'Image Quality & File Formats', 'Choose file formats, resolution, and color settings for your images.', 10, [
    ['topic-10-lesson-01','jpeg-vs-raw','JPEG vs RAW',7], ['topic-10-lesson-02','raw-photography','RAW Photography',7], ['topic-10-lesson-03','image-resolution','Image Resolution',6], ['topic-10-lesson-04','aspect-ratios','Aspect Ratios',6], ['topic-10-lesson-05','compression','Compression',6], ['topic-10-lesson-06','color-spaces','Color Spaces',7], ['topic-10-lesson-07','choosing-the-best-photo-settings','Choosing the Best Photo Settings',7],
  ]),
  makeTopic('topic-11', 'composition', 'Composition', 'Use placement, lines, space, and perspective to guide attention in a photograph.', 11, [
    ['topic-11-lesson-01','what-makes-a-good-photo','What Makes a Good Photo?',6], ['topic-11-lesson-02','rule-of-thirds','Rule of Thirds',6], ['topic-11-lesson-03','leading-lines','Leading Lines',6], ['topic-11-lesson-04','framing','Framing',6], ['topic-11-lesson-05','symmetry','Symmetry',5], ['topic-11-lesson-06','negative-space','Negative Space',6], ['topic-11-lesson-07','perspective','Perspective',7], ['topic-11-lesson-08','foreground-subject-and-background','Foreground, Subject and Background',7], ['topic-11-lesson-09','breaking-composition-rules','Breaking Composition Rules',6],
  ]),
  makeTopic('topic-12', 'working-with-light', 'Working With Light', 'Read natural and artificial light to shape the mood and clarity of a scene.', 12, [
    ['topic-12-lesson-01','direction-of-light','Direction of Light',7], ['topic-12-lesson-02','hard-vs-soft-light','Hard vs Soft Light',7], ['topic-12-lesson-03','natural-light','Natural Light',6], ['topic-12-lesson-04','golden-hour','Golden Hour',6], ['topic-12-lesson-05','blue-hour','Blue Hour',6], ['topic-12-lesson-06','shooting-at-night','Shooting at Night',7], ['topic-12-lesson-07','backlighting','Backlighting',6], ['topic-12-lesson-08','silhouettes','Silhouettes',6], ['topic-12-lesson-09','introduction-to-artificial-lighting','Introduction to Artificial Lighting',7],
  ]),
  makeTopic('topic-13', 'gh5-photography-settings', 'GH5 Photography Settings', 'Set up GH5 photo tools for speed, stabilization, bracketing, and deliberate shooting.', 13, [
    ['topic-13-lesson-01','photo-style','Photo Style',6], ['topic-13-lesson-02','burst-modes','Burst Modes',6], ['topic-13-lesson-03','electronic-vs-mechanical-shutter','Electronic vs Mechanical Shutter',7], ['topic-13-lesson-04','image-stabilization','Image Stabilization',7], ['topic-13-lesson-05','auto-bracketing','Auto Bracketing',6], ['topic-13-lesson-06','hdr','HDR',6], ['topic-13-lesson-07','silent-mode','Silent Mode',5], ['topic-13-lesson-08','long-exposure','Long Exposure',7], ['topic-13-lesson-09','customizing-gh5-buttons','Customizing GH5 Buttons',7],
  ]),
  makeTopic('topic-14', 'photography-by-situation', 'Photography by Situation', 'Adapt camera settings and technique to common photographic situations.', 14, [
    ['topic-14-lesson-01','portrait-photography','Portrait Photography',8], ['topic-14-lesson-02','landscape-photography','Landscape Photography',8], ['topic-14-lesson-03','street-photography','Street Photography',7], ['topic-14-lesson-04','product-photography','Product Photography',7], ['topic-14-lesson-05','architecture','Architecture',6], ['topic-14-lesson-06','sports-and-action','Sports and Action',7], ['topic-14-lesson-07','low-light-photography','Low-Light Photography',7], ['topic-14-lesson-08','night-photography','Night Photography',7],
  ]),
  makeTopic('topic-15', 'video-fundamentals', 'Video Fundamentals', 'Understand how moving images use frame rate, shutter speed, exposure, ISO, and aperture.', 15, [
    ['topic-15-lesson-01','how-video-works','How Video Works',6], ['topic-15-lesson-02','resolution','Resolution',6], ['topic-15-lesson-03','frame-rate','Frame Rate',7], ['topic-15-lesson-04','shutter-speed-for-video','Shutter Speed for Video',7], ['topic-15-lesson-05','the-180-degree-shutter-rule','The 180-Degree Shutter Rule',7], ['topic-15-lesson-06','video-exposure','Video Exposure',7], ['topic-15-lesson-07','video-iso','Video ISO',6], ['topic-15-lesson-08','video-aperture','Video Aperture',6],
  ]),
  makeTopic('topic-16', 'gh5-video-settings', 'GH5 Video Settings', 'Configure recording formats, frame rates, and quality choices on the GH5.', 16, [
    ['topic-16-lesson-01','gh5-video-modes','GH5 Video Modes',7], ['topic-16-lesson-02','4k-vs-full-hd','4K vs Full HD',6], ['topic-16-lesson-03','24-25-30-50-and-60-fps','24, 25, 30, 50 and 60 FPS',7], ['topic-16-lesson-04','bitrate-explained','Bitrate Explained',6], ['topic-16-lesson-05','8-bit-vs-10-bit','8-bit vs 10-bit',7], ['topic-16-lesson-06','420-vs-422','4:2:0 vs 4:2:2',7], ['topic-16-lesson-07','mov-vs-mp4','MOV vs MP4',6], ['topic-16-lesson-08','recording-quality-settings','Recording Quality Settings',7],
  ]),
  makeTopic('topic-17', 'video-color-and-picture-profiles', 'Video Color & Picture Profiles', 'Choose picture profiles and understand the foundations of dynamic range and grading.', 17, [
    ['topic-17-lesson-01','picture-profiles','Picture Profiles',6], ['topic-17-lesson-02','standard-vs-natural-vs-cinelike','Standard vs Natural vs Cinelike',7], ['topic-17-lesson-03','cinelike-d-and-cinelike-v','Cinelike D and Cinelike V',6], ['topic-17-lesson-04','introduction-to-v-log-l','Introduction to V-Log L',7], ['topic-17-lesson-05','dynamic-range','Dynamic Range',6], ['topic-17-lesson-06','flat-profiles','Flat Profiles',6], ['topic-17-lesson-07','exposing-log-footage','Exposing Log Footage',7], ['topic-17-lesson-08','introduction-to-color-grading','Introduction to Color Grading',7],
  ]),
  makeTopic('topic-18', 'video-focus', 'Video Focus', 'Make reliable focus choices for video using autofocus and manual techniques.', 18, [
    ['topic-18-lesson-01','autofocus-for-video','Autofocus for Video',6], ['topic-18-lesson-02','continuous-af','Continuous AF',6], ['topic-18-lesson-03','face-tracking','Face Tracking',6], ['topic-18-lesson-04','manual-focus-for-video','Manual Focus for Video',7], ['topic-18-lesson-05','focus-peaking','Focus Peaking',6], ['topic-18-lesson-06','focus-pulling','Focus Pulling',7], ['topic-18-lesson-07','choosing-af-vs-manual-focus','Choosing AF vs Manual Focus',7],
  ]),
  makeTopic('topic-19', 'image-stabilization', 'Image Stabilization', 'Use the GH5, lens, and your own technique to reduce unwanted movement.', 19, [
    ['topic-19-lesson-01','why-camera-shake-happens','Why Camera Shake Happens',6], ['topic-19-lesson-02','gh5-in-body-stabilization','GH5 In-Body Stabilization',7], ['topic-19-lesson-03','lens-stabilization','Lens Stabilization',6], ['topic-19-lesson-04','dual-is','Dual I.S.',6], ['topic-19-lesson-05','stabilization-for-photography','Stabilization for Photography',6], ['topic-19-lesson-06','stabilization-for-video','Stabilization for Video',6], ['topic-19-lesson-07','handheld-shooting-techniques','Handheld Shooting Techniques',7],
  ]),
  makeTopic('topic-20', 'audio-for-video', 'Audio for Video', 'Capture clearer video sound with careful microphone, level, and monitoring choices.', 20, [
    ['topic-20-lesson-01','why-audio-matters','Why Audio Matters',5], ['topic-20-lesson-02','gh5-built-in-microphone','GH5 Built-in Microphone',6], ['topic-20-lesson-03','external-microphones','External Microphones',7], ['topic-20-lesson-04','audio-levels','Audio Levels',6], ['topic-20-lesson-05','avoiding-clipping','Avoiding Clipping',5], ['topic-20-lesson-06','monitoring-audio','Monitoring Audio',6], ['topic-20-lesson-07','wind-noise','Wind Noise',5], ['topic-20-lesson-08','recording-clean-dialogue','Recording Clean Dialogue',7],
  ]),
  makeTopic('topic-21', 'video-composition-and-camera-movement', 'Video Composition & Camera Movement', 'Compose and move the camera with purpose to make video easier to watch.', 21, [
    ['topic-21-lesson-01','video-composition','Video Composition',6], ['topic-21-lesson-02','static-shots','Static Shots',5], ['topic-21-lesson-03','pan','Pan',5], ['topic-21-lesson-04','tilt','Tilt',5], ['topic-21-lesson-05','push-in-and-pull-out','Push-In and Pull-Out',6], ['topic-21-lesson-06','handheld-movement','Handheld Movement',6], ['topic-21-lesson-07','using-a-tripod','Using a Tripod',6], ['topic-21-lesson-08','cinematic-camera-movement','Cinematic Camera Movement',7],
  ]),
  makeTopic('topic-22', 'advanced-gh5-features', 'Advanced GH5 Features', 'Explore GH5 tools that give you more control once the fundamentals feel familiar.', 22, [
    ['topic-22-lesson-01','custom-function-buttons','Custom Function Buttons',6], ['topic-22-lesson-02','custom-shooting-modes','Custom Shooting Modes',6], ['topic-22-lesson-03','zebra-patterns','Zebra Patterns',6], ['topic-22-lesson-04','waveform-monitor','Waveform Monitor',7], ['topic-22-lesson-05','focus-transition','Focus Transition',6], ['topic-22-lesson-06','variable-frame-rate','Variable Frame Rate',6], ['topic-22-lesson-07','time-lapse','Time-Lapse',6], ['topic-22-lesson-08','stop-motion','Stop Motion',6], ['topic-22-lesson-09','anamorphic-mode','Anamorphic Mode',7],
  ]),
  makeTopic('topic-23', 'camera-setup-presets', 'Camera Setup Presets', 'Build practical starting setups for common photo and video situations.', 23, [
    ['topic-23-lesson-01','everyday-photography-setup','Everyday Photography Setup',6], ['topic-23-lesson-02','portrait-setup','Portrait Setup',6], ['topic-23-lesson-03','landscape-setup','Landscape Setup',6], ['topic-23-lesson-04','street-photography-setup','Street Photography Setup',6], ['topic-23-lesson-05','low-light-setup','Low-Light Setup',7], ['topic-23-lesson-06','cinematic-video-setup','Cinematic Video Setup',7], ['topic-23-lesson-07','slow-motion-setup','Slow-Motion Setup',6], ['topic-23-lesson-08','youtube-interview-setup','YouTube/Interview Setup',7],
  ]),
  makeTopic('topic-24', 'from-camera-to-computer', 'From Camera to Computer', 'Create a reliable workflow for transfers, organization, backups, editing, and export.', 24, [
    ['topic-24-lesson-01','understanding-sd-cards','Understanding SD Cards',6], ['topic-24-lesson-02','transferring-photos-and-videos','Transferring Photos and Videos',6], ['topic-24-lesson-03','organizing-files','Organizing Files',7], ['topic-24-lesson-04','backups','Backups',6], ['topic-24-lesson-05','raw-development','RAW Development',7], ['topic-24-lesson-06','basic-photo-editing','Basic Photo Editing',7], ['topic-24-lesson-07','basic-video-editing','Basic Video Editing',7], ['topic-24-lesson-08','exporting-for-web-and-social-media','Exporting for Web and Social Media',6],
  ]),
  makeTopic('topic-25', 'practical-projects', 'Practical Projects', 'Put your learning together through focused photo and video projects.', 25, [
    ['topic-25-lesson-01','take-your-first-manual-photo','Take Your First Manual Photo',10], ['topic-25-lesson-02','create-background-blur','Create Background Blur',8], ['topic-25-lesson-03','freeze-a-moving-subject','Freeze a Moving Subject',8], ['topic-25-lesson-04','photograph-golden-hour','Photograph Golden Hour',8], ['topic-25-lesson-05','shoot-a-night-scene','Shoot a Night Scene',9], ['topic-25-lesson-06','record-your-first-cinematic-clip','Record Your First Cinematic Clip',10], ['topic-25-lesson-07','shoot-slow-motion','Shoot Slow Motion',8], ['topic-25-lesson-08','create-a-30-second-video','Create a 30-Second Video',10], ['topic-25-lesson-09','complete-photo-challenge','Complete Photo Challenge',12],
  ]),
  makeTopic('topic-26', 'photography-reference', 'Photography Reference', 'Use quick reference material to revisit terms, settings, controls, and common choices.', 26, [
    ['topic-26-lesson-01','photography-glossary','Photography Glossary',6], ['topic-26-lesson-02','exposure-cheat-sheet','Exposure Cheat Sheet',5], ['topic-26-lesson-03','aperture-cheat-sheet','Aperture Cheat Sheet',5], ['topic-26-lesson-04','shutter-speed-cheat-sheet','Shutter Speed Cheat Sheet',5], ['topic-26-lesson-05','iso-cheat-sheet','ISO Cheat Sheet',5], ['topic-26-lesson-06','gh5-button-reference','GH5 Button Reference',7], ['topic-26-lesson-07','gh5-menu-reference','GH5 Menu Reference',8], ['topic-26-lesson-08','recommended-settings-reference','Recommended Settings Reference',7],
  ]),
] as const satisfies readonly Topic[]

const lessonEntries: readonly CurriculumLesson[] = curriculum.flatMap((topic) => topic.lessons.map((lesson) => ({ topic, lesson })))

function validateCurriculum(topics: readonly Topic[]): void {
  const topicIds = new Set<string>(), topicSlugs = new Set<string>(), lessonIds = new Set<string>(), lessonRoutes = new Set<string>()
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  for (const topic of topics) {
    if (!topic.title || !topic.lessons.length || !slugPattern.test(topic.slug) || topicIds.has(topic.id) || topicSlugs.has(topic.slug)) throw new Error(`Invalid topic: ${topic.id}`)
    topicIds.add(topic.id); topicSlugs.add(topic.slug)
    for (const lesson of topic.lessons) {
      const route = `${topic.slug}/${lesson.slug}`
      if (!lesson.title || !slugPattern.test(lesson.slug) || lessonIds.has(lesson.id) || lessonRoutes.has(route)) throw new Error(`Invalid lesson: ${lesson.id}`)
      lessonIds.add(lesson.id); lessonRoutes.add(route)
    }
  }
}

validateCurriculum(curriculum)

export const getAllTopics = (): readonly Topic[] => curriculum
export const getTopicBySlug = (topicSlug: string): Topic | undefined => curriculum.find((topic) => topic.slug === topicSlug)
export const getLessonBySlug = (topicSlug: string, lessonSlug: string): CurriculumLesson | undefined => {
  const topic = getTopicBySlug(topicSlug), lesson = topic?.lessons.find((lesson) => lesson.slug === lessonSlug)
  return topic && lesson ? { topic, lesson } : undefined
}
const entryIndex = (topicSlug: string, lessonSlug: string): number => lessonEntries.findIndex(({ topic, lesson }) => topic.slug === topicSlug && lesson.slug === lessonSlug)
export const getPreviousLesson = (topicSlug: string, lessonSlug: string): CurriculumLesson | undefined => {
  const index = entryIndex(topicSlug, lessonSlug)
  return index > 0 ? lessonEntries[index - 1] : undefined
}
export const getNextLesson = (topicSlug: string, lessonSlug: string): CurriculumLesson | undefined => {
  const index = entryIndex(topicSlug, lessonSlug)
  return index >= 0 && index < lessonEntries.length - 1 ? lessonEntries[index + 1] : undefined
}
export const getLessonPosition = (topicSlug: string, lessonSlug: string): LessonPosition | undefined => {
  const topic = getTopicBySlug(topicSlug), index = topic?.lessons.findIndex((lesson) => lesson.slug === lessonSlug) ?? -1
  return topic && index >= 0 ? { index: index + 1, total: topic.lessons.length } : undefined
}
