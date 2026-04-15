export type BodyStructure = 'apple' | 'inverted-triangle' | 'rectangle' | 'triangle' | 'hourglass';
export type VerticalLine = 'curvy' | 'angular';
export type ShoulderType = 'dropped' | 'square' | 'standard';
export type HipPlacement = 'low' | 'high' | 'standard';
export type ProportionType = 'elongated-neck' | 'elongated-torso' | 'elongated-legs' | 'standard';

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: 'body-structure' | 'proportions' | 'lines-fabrics' | 'shoulder' | 'hip';
  tags: {
    bodyStructure?: BodyStructure[];
    verticalLine?: VerticalLine[];
    shoulderType?: ShoulderType[];
    hipPlacement?: HipPlacement[];
    proportionType?: ProportionType[];
  };
  points: string[];
  sourceNote: string;
}

export const LESSONS: Lesson[] = [
  // ── BODY STRUCTURE: APPLE ──
  {
    id: 'apple-balance',
    title: 'Balance Point',
    subtitle: 'Apple Body Structure',
    category: 'body-structure',
    tags: { bodyStructure: ['apple'] },
    points: [
      'Focus detail near the face: hair pieces, earrings, and a bold lip.',
      'Keep emphasis at the shoulder line and the top of the shoulders.',
      'Use hip-line detailing the same way you would for inverted triangle and rectangle balances.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'apple-inside-lines',
    title: 'Inside Lines',
    subtitle: 'Apple Body Structure',
    category: 'body-structure',
    tags: { bodyStructure: ['apple'] },
    points: [
      'Use a curvy neckline.',
      'Add a horizontal line at the shoulder.',
      'Use angular wrap styling.',
      'A deep plunge neckline can work when applicable, especially on a smaller chest.',
      'Place a horizontal line at the thigh area.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'apple-outside-lines',
    title: 'Outside Lines',
    subtitle: 'Apple Body',
    category: 'body-structure',
    tags: { bodyStructure: ['apple'] },
    points: [
      'Add fun shoulder details.',
      'Use flowy sleeves or bell sleeves.',
      'Create a flowy A-line silhouette.',
      'Use an A-line shape through the hip area.',
      'Choose flared bottoms.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'apple-shoulder-neckline',
    title: 'Shoulder & Neckline',
    subtitle: 'Apple Body Structure',
    category: 'shoulder',
    tags: { bodyStructure: ['apple'] },
    points: [
      'Use a curvy collar.',
      'Favor a shoulder-curve sleeve line.',
      'Keep a horizontal line at the shoulder.',
      'Skip heavy collars.',
      'Wrap shapes work well.',
      'Project the shoulder outward visually.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },

  // ── BODY STRUCTURE: INVERTED TRIANGLE ──
  {
    id: 'inverted-triangle-balance',
    title: 'Balance Point',
    subtitle: 'Inverted Triangle Body Structure',
    category: 'body-structure',
    tags: { bodyStructure: ['inverted-triangle'] },
    points: [
      'Bring attention to the collar bone.',
      'Put details at the hip area: upper tops, sleeve details, bracelets, rings, bags, pockets, peaks, and prints.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'inverted-triangle-inside-lines',
    title: 'Inside Lines',
    subtitle: 'Inverted Triangle Body Structure',
    category: 'body-structure',
    tags: { bodyStructure: ['inverted-triangle'] },
    points: [
      'Use deep V-necks or long necklaces based on the proportions balance point.',
      'Use angular cuts and asymmetrical tops.',
      'Use angular cuts or side tucks in the waist area; belts can help.',
      'Use angular cuts at the hip line, then a straighter cut through the lower body.',
      'Straight lines in shoes, straps, and length support this balance.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },

  // ── BODY STRUCTURE: RECTANGLE ──
  {
    id: 'rectangle-balance',
    title: 'Balance Point',
    subtitle: 'Rectangle Body Structure',
    category: 'body-structure',
    tags: { bodyStructure: ['rectangle'] },
    points: [
      'Emphasize the collar bone and mid-chest area.',
      'Use hip and waistband detailing the same way you would for the inverted triangle.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'rectangle-inside-lines',
    title: 'Inside Lines',
    subtitle: 'Rectangle Body Structure',
    category: 'body-structure',
    tags: { bodyStructure: ['rectangle'] },
    points: [
      'Angular cuts help elongate the body.',
      'Use angular cuts on the upper body.',
      'Use side tucks or a one-side tuck.',
      'Work with visible angles throughout the look.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'inverted-rectangle-shoulder',
    title: 'Shoulder / Neck Line',
    subtitle: 'Inverted Triangle & Rectangle',
    category: 'shoulder',
    tags: { bodyStructure: ['inverted-triangle', 'rectangle'] },
    points: [
      'Halter styles work well.',
      'Use shapes that connect to or sit at the shoulder bone.',
      'Dropped sleeves and cap sleeves can work.',
      'Crew neck, sweetheart, U-neckline, and wrap styles are options.',
      'Strapless or spaghetti straps on an angle are especially useful.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },

  // ── BODY STRUCTURE: TRIANGLE ──
  {
    id: 'triangle-balance',
    title: 'Balance Point',
    subtitle: 'Triangle Body Structure',
    category: 'body-structure',
    tags: { bodyStructure: ['triangle'] },
    points: [
      'Bring detail to the ears, shoulders, and bust area when applicable.',
      'Always define the waist.',
      'Good upper-body details include pockets, oversized shoulders, shoulder padding, shoulder details, prints, wide lapels, and structured fabrics.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'triangle-outside-lines',
    title: 'Outside Lines',
    subtitle: 'Triangle Body',
    category: 'body-structure',
    tags: { bodyStructure: ['triangle'] },
    points: [
      'Create volume on the upper body.',
      'Use oversized or padded shoulders.',
      'Use puff sleeves and structured pieces.',
      'High-waisted bottoms and cropped tops/jackets/sweaters help keep the waist clean.',
      'Keep the hip area fitted and clean.',
      'Flare out from the knee in pants, jeans, skirts, or bell-bottom shapes.',
      'A fitted flare or ballerina pant shape can work.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },

  // ── BODY STRUCTURE: HOURGLASS ──
  {
    id: 'hourglass-balance',
    title: 'Balance Point',
    subtitle: 'Hourglass Body Structure',
    category: 'body-structure',
    tags: { bodyStructure: ['hourglass'] },
    points: [
      'Draw attention to the ear and collar bone.',
      'Outline the waist at its smallest, narrowest point.',
      'Belts and cinched waists reinforce this balance.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'hourglass-outside-lines',
    title: 'Outside Lines',
    subtitle: 'Hourglass Body',
    category: 'body-structure',
    tags: { bodyStructure: ['hourglass'] },
    points: [
      'Use loose or fitted sleeves.',
      'Loose cropped pieces can work.',
      'Keep the waist, thigh, and hip line fitted and clean.',
      'Flare from mid-thigh downward.',
      'Bell-bottom or straight lower-body shapes both work.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'triangle-hourglass-inside-lines',
    title: 'Inside Lines',
    subtitle: 'Triangle & Hourglass',
    category: 'body-structure',
    tags: { bodyStructure: ['triangle', 'hourglass'] },
    points: [
      'Round necklines work well.',
      'Use horizontal lines on the shoulder and chest area.',
      'Use horizontal lines in the waist area with cropped pieces or belts.',
      'A curvy line with a point above the hip can work.',
      'Keep the hip area clean.',
      'Use angular cuts on the lower body to elongate and minimize volume.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'triangle-hourglass-shoulder',
    title: 'Shoulder / Neck Line',
    subtitle: 'Triangle & Hourglass',
    category: 'shoulder',
    tags: { bodyStructure: ['triangle', 'hourglass'] },
    points: [
      'Crew neck and scoop neck work well.',
      'Let the shoulder line sit outside the shoulder bone.',
      'Use square necklines and wide lapels.',
      'Straight off-shoulder and straight strapless shapes work.',
      'Cowl necks and thick straps are also good options.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },

  // ── PROPORTIONS ──
  {
    id: 'proportions-elongated-neck',
    title: 'Proportions',
    subtitle: 'Elongated Neck Balance',
    category: 'proportions',
    tags: { proportionType: ['elongated-neck'] },
    points: [
      'Use oversized earrings and statement necklaces or scarves near the face.',
      'Stand-up collars or a turtleneck with a structured necklace on top can work.',
      'Keep the neck area structured.',
      'Use oversized upper-body structure, structured fabrics, and prints.',
      'Keep tops no longer than about a palm above the hip line.',
      'Keep sleeves clean and no longer than about an inch above the wrist bone.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'proportions-elongated-torso',
    title: 'Proportions',
    subtitle: 'Elongated Torso Balance',
    category: 'proportions',
    tags: { proportionType: ['elongated-torso'] },
    points: [
      'Place detail on the upper body.',
      'Use a second balance point for necklines around the core face point below mid-chest.',
      'Use shoulder bags, cropped sleeves, cropped tops, jackets, and sweaters.',
      'Use belts, high waists, high-waisted bottoms, and mini pockets.',
      'Keep sleeves no longer than the wrist bone.',
      'For shorts and skirts, keep the length around a palm below the hip and preferably angled.',
      'Top length should not go lower than about a palm above the hip.',
      'Use full tucks or a center tuck.',
      'Use angular lines on the lower body to elongate.',
      'Floor-length pants and matching footwear to the lower-body garment help.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'proportions-elongated-torso-inside',
    title: 'Inside Lines',
    subtitle: 'Elongated Torso Length',
    category: 'proportions',
    tags: { proportionType: ['elongated-torso'] },
    points: [
      'Use horizontal lines from the waist upward.',
      'Use cropped tops.',
      'Keep coats around a palm above the hip; do not let pockets dominate.',
      'Use belts to draw the top upward.',
      'Use angular cuts on the lower body.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'proportions-elongated-legs-inside',
    title: 'Inside Lines',
    subtitle: 'Elongated Legs Length',
    category: 'proportions',
    tags: { proportionType: ['elongated-legs'] },
    points: [
      'Use angular lines, tucks, and shaped cuts on the upper body.',
      'Use horizontal cuts on the lower body.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },

  // ── LINES & FABRICS ──
  {
    id: 'lines-curvy',
    title: 'Lines / Shapes',
    subtitle: 'Curvy Vertical Line',
    category: 'lines-fabrics',
    tags: { verticalLine: ['curvy'] },
    points: [
      'Choose curvy eyewear.',
      'Choose curvy-shaped accessories scaled to the body.',
      'Use curvy necklines, buttons, and details.',
      'Reflect the waist line with a belt at the balance point.',
      'Use curvy prints, waist lines, hip lines, and pockets.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'fabrics-curvy',
    title: 'Inside Line Fabrics',
    subtitle: 'Curvy',
    category: 'lines-fabrics',
    tags: { verticalLine: ['curvy'] },
    points: [
      'Refer to the texture/fabric session and your specific upper- and lower-body lines.',
      'Upper body: use flowy or liquid fabrics with some weight, stretch, bias cuts, and light fabrics that fall; avoid lightweight fabrics that create volume; avoid shiny fabrics if you do not want added volume.',
      'Lower body: use fabrics that hug curves, medium weight for support, stretch fabrics, and bias cuts; avoid shiny fabrics if you want to avoid extra volume.',
      'If the shoulders are narrower, use bulkier or thicker fabrics on top to help balance the hips.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'fabrics-angular',
    title: 'Inside Line Fabrics',
    subtitle: 'Angular',
    category: 'lines-fabrics',
    tags: { verticalLine: ['angular'] },
    points: [
      'Refer to the angular session when applying fabrics.',
      'If broader on top: use mid-weight fabrics, with or without stretch; avoid heavy flowy fabrics without structure.',
      'If shoulder and hip are proportional: avoid very flowy fabrics on the upper body.',
      'If the upper body is narrower: use bulky, structured, thick, or heavy fabrics, with or without stretch; avoid thin fabrics.',
      'Lower body: use fabrics with little to no stretch and any weight that holds shape.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },

  // ── SHOULDER ──
  {
    id: 'shoulder-dropped',
    title: 'Shoulder',
    subtitle: 'Dropped Shoulder',
    category: 'shoulder',
    tags: { shoulderType: ['dropped'] },
    points: [
      'Shoulder padding is not for T-shirts or soft tops.',
      'T-shirt sleeves, folded jacket sleeves, and half sleeves can work.',
      'Keep volume on the shoulder line and choose structured fabrics.',
      'Use a straighter armhole cut.',
      'Upper garments can be cropped or stop around a palm above the hip.',
      'Bulky shapes can work.',
      'Avoid dropped-shoulder lines and avoid fabrics with no structure.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'shoulder-square',
    title: 'Shoulder',
    subtitle: 'Square Shoulder',
    category: 'shoulder',
    tags: { shoulderType: ['square'] },
    points: [
      'Halter cuts that angle inward at the shoulder work well.',
      'Avoid shoulder padding and shoulder details.',
      'Bell sleeves, curvy chest-area lines, fitted or loose cuts, and cap sleeves can work.',
      'Avoid dropped-shoulder lines.',
      'Folded sleeves and collar-bone jewelry such as a tennis necklace work well.',
      'Standard shoulder rules can still apply depending on body structure.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },

  // ── HIP ──
  {
    id: 'hip-low',
    title: 'Hip',
    subtitle: 'Low Hip',
    category: 'hip',
    tags: { hipPlacement: ['low'] },
    points: [
      'Use bold earrings and shoulder details.',
      'Use medium to high rises; refer back to body proportions guidance.',
      'Keep the hip fitted from the waist to mid-thigh.',
      'Avoid extra detail at the hip, upper thigh, and wrist area.',
      'Use structured fabrics with stretch.',
      'Keep sleeves shorter than the wrist bone.',
      'Use sleek fabrics cut on the bias.',
      'Bell-bottom, boot-cut, and straight silhouettes work well.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
  {
    id: 'hip-high',
    title: 'Hip',
    subtitle: 'High Hip',
    category: 'hip',
    tags: { hipPlacement: ['high'] },
    points: [
      'Use medium to low rises.',
      'Use a looser fit through the hip area.',
      'Place details on the hip area as guided by body structure.',
      'Extra-long sleeves and bracelets placed lower can help.',
      'Let fabric relax with the body\'s natural line.',
      'Flare pants work well.',
      'Skinny pants should be paired with long, loose-fit tops, jackets, or sweaters.',
    ],
    sourceNote: 'Source sketch included for visual reference.',
  },
];

export type UserProfile = {
  bodyStructure: BodyStructure | null;
  verticalLine: VerticalLine | null;
  shoulderType: ShoulderType | null;
  hipPlacement: HipPlacement | null;
  proportionTypes: ProportionType[];
};

export function getPersonalizedLessons(profile: UserProfile): Lesson[] {
  return LESSONS.filter(lesson => {
    const { tags } = lesson;

    if (tags.bodyStructure && profile.bodyStructure) {
      if (tags.bodyStructure.includes(profile.bodyStructure)) return true;
    }
    if (tags.verticalLine && profile.verticalLine) {
      if (tags.verticalLine.includes(profile.verticalLine)) return true;
    }
    if (tags.shoulderType && profile.shoulderType) {
      if (tags.shoulderType.includes(profile.shoulderType)) return true;
    }
    if (tags.hipPlacement && profile.hipPlacement) {
      if (tags.hipPlacement.includes(profile.hipPlacement)) return true;
    }
    if (tags.proportionType && profile.proportionTypes.length > 0) {
      if (tags.proportionType.some(p => profile.proportionTypes.includes(p))) return true;
    }
    return false;
  });
}

export const BODY_STRUCTURE_INFO: Record<BodyStructure, { label: string; description: string }> = {
  apple: {
    label: 'Apple',
    description: 'Fuller midsection, narrower hips and shoulders, with weight carried through the center.',
  },
  'inverted-triangle': {
    label: 'Inverted Triangle',
    description: 'Broader shoulders with narrower hips — strength and structure at the top.',
  },
  rectangle: {
    label: 'Rectangle',
    description: 'Shoulders and hips are close in width with a less defined waist — a balanced, linear structure.',
  },
  triangle: {
    label: 'Triangle',
    description: 'Hips are wider than shoulders — fuller in the lower body with a narrower upper frame.',
  },
  hourglass: {
    label: 'Hourglass',
    description: 'Shoulders and hips are balanced with a clearly defined, narrower waist.',
  },
};
