function interpretWeather(weather) {
  const interpretation = {
    mood: new Set(),
    atmosphere: new Set(),
    scenario: new Set(),
    objects: new Set(),
    symbols: new Set(),
    palette: new Set(),
    lightings: new Set(),
    sounds: new Set(),
    textures: new Set(),
    motion: new Set(),
    emotions: new Set(),
    pace: new Set(),
    imagery: new Set(),
  };

  // =================================================
  // Temperature
  // =================================================

  // scorching

  if (weather.temperature >= 40) {
    addTraits(interpretation, {
      mood: ["intense", "overwhelming"],
      atmosphere: ["oppressive heat", "air trembling with light"],
      imagery: ["mirages", "melting wax", "cracked earth", "endless dunes"],
      symbols: ["fire", "sun"],
      palette: ["deep orange", "red", "burnt gold"],
      sounds: ["dry wind"],
      textures: ["cracked stone", "sun-baked clay"],
      emotions: ["urgency", "awe"],
      pace: ["heavy"],
    });
  }

  // hot
  else if (weather.temperature >= 32) {
    addTraits(interpretation, {
      mood: ["restless", "dreamlike"],
      atmosphere: ["heat shimmering in the distance"],
      imagery: ["golden dust", "sunlit courtyards", "mirages"],
      symbols: ["fire"],
      palette: ["amber", "gold", "orange"],
      sounds: ["cicadas"],
      textures: ["warm stone"],
      emotions: ["anticipation"],
      pace: ["slow"],
    });
  }

  // warm
  else if (weather.temperature >= 25) {
    addTraits(interpretation, {
      mood: ["content", "bright"],
      atmosphere: ["sun-warmed air"],
      imagery: ["rolling fields", "open windows", "breezy hills"],
      symbols: ["sunlight"],
      palette: ["gold", "green", "sky blue"],
      sounds: ["birdsong"],
      textures: ["soft grass"],
      emotions: ["optimism"],
      pace: ["gentle"],
    });
  }

  // mild
  else if (weather.temperature >= 18) {
    addTraits(interpretation, {
      mood: ["balanced", "comfortable"],
      atmosphere: ["easy afternoon air"],
      imagery: ["quiet gardens", "slow rivers", "tree lined paths"],
      symbols: ["pathways"],
      palette: ["cream", "green", "light gold"],
      sounds: ["rustling leaves"],
      textures: ["smooth bark"],
      emotions: ["contentment"],
      pace: ["steady"],
    });
  }

  // cool
  else if (weather.temperature >= 10) {
    addTraits(interpretation, {
      mood: ["peaceful"],
      atmosphere: ["gentle coolness"],
      imagery: ["falling leaves", "quiet gardens"],
      symbols: ["pathways"],
      palette: ["olive", "soft blue"],
      sounds: ["distant birds"],
      textures: ["smooth bark"],
      emotions: ["contentment"],
      pace: ["slow"],
    });
  }

  // cold
  else if (weather.temperature >= 0) {
    addTraits(interpretation, {
      mood: ["reflective", "quiet"],
      atmosphere: ["cold morning air"],
      imagery: ["mist", "bare trees", "stone pathways"],
      symbols: ["lanterns"],
      palette: ["grey", "blue"],
      sounds: ["rustling branches"],
      textures: ["cold stone"],
      emotions: ["nostalgia"],
      pace: ["gentle"],
    });
  }

  // Freezing
  else {
    addTraits(interpretation, {
      mood: ["barren", "silent"],
      atmosphere: ["snowfields", "ice-covered lakes", "crystalline forests"],
      symbols: ["glass", "frozen rivers"],
      palette: ["white", "silver", "ice blue"],
      sounds: ["creaking ice", "distant wind"],
      textures: ["powder snow", "frost"],
      emotions: ["solitude", "clarity"],
      pace: ["still"],
    });
  }

  // =================================================
  // Humidity
  // =================================================

  // very dry air

  if (weather.humidity <= 25) {
    addTraits(interpretation, {
      mood: ["weightless", "isolated"],
      atmosphere: ["dry", "crystal clear"],
      scenario: ["sunlit plateaus", "quiet deserts"],
      objects: ["weathered stones", "dry reeds"],
      imagery: ["dust drifting in sunlight", "endless horizons"],
      palette: ["sand", "pale gold", "warm ivory"],
      lightings: ["sharp sunlight"],
      sounds: ["distant wind", "quiet stillness"],
      textures: ["dry earth", "rough stone"],
      motion: ["drifting dust"],
      emotions: ["freedom", "solitude"],
      pace: ["slow"],
    });
  }

  // moderate humidity
  else if (weather.humidity <= 50) {
    addTraits(interpretation, {
      mood: ["comfortable", "open"],
      atmosphere: ["fresh breathable air"],
      scenario: ["rolling meadows", "open windows"],
      objects: ["wildflowers", "open windows"],
      imagery: ["clear skies", "sunlit fields"],
      palette: ["green", "soft blue"],
      lightings: ["natural daylight"],
      sounds: ["birdsong", "rustling leaves"],
      textures: ["soft grass"],
      motion: ["gentle breeze"],
      emotions: ["contentment", "hope"],
      pace: ["gentle"],
    });
  }

  // humid
  else if (weather.humidity <= 75) {
    addTraits(interpretation, {
      mood: ["dreamlike", "contemplative"],
      atmosphere: ["heavy summer air"],
      scenario: ["lush forests", "still ponds"],
      objects: ["dew covered leaves", "hanging vines"],
      imagery: ["mist rising from water", "emerald foliage"],
      palette: ["deep green", "jade"],
      lightings: ["filtered sunlight"],
      sounds: ["distant insects", "dripping water"],
      textures: ["damp moss", "cool leaves"],
      motion: ["slow drifting mist"],
      emotions: ["wonder", "calm"],
      pace: ["unhurried"],
    });
  }

  // opperessive humidity
  else {
    addTraits(interpretation, {
      mood: ["oppressive", "mysterious"],
      atmosphere: ["air heavy with moisture"],
      scenario: ["ancient swamps", "dense jungles"],
      objects: ["twisted roots", "still water"],
      imagery: ["thick mist", "towering ferns"],
      palette: ["dark green", "charcoal", "deep teal"],
      lightings: ["dim filtered light"],
      sounds: ["echoing droplets", "hidden wildlife"],
      textures: ["wet stone", "slick bark"],
      motion: ["curling fog", "slow ripples"],
      emotions: ["uncertainty", "curiosity"],
      pace: ["lingering"],
    });
  }

  // =================================================
  // Rain
  // =================================================

  // no rain

  if (!weather.will_it_rain) {
    addTraits(interpretation, {
      atmosphere: ["clear air"],
      scenario: ["open meadows", "sunlit paths"],
      objects: ["wildflowers"],
      lightings: ["clear daylight"],
      motion: ["gentle drifting clouds"],
    });
  }

  // slight chance
  else if (weather.chance_of_rain <= 30) {
    addTraits(interpretation, {
      mood: ["expectant"],
      atmosphere: ["air waiting for rain"],
      scenario: ["quiet village streets"],
      objects: ["closed umbrella"],
      imagery: ["darkening clouds"],
      lightings: ["soft grey light"],
      motion: ["leaves beginning to sway"],
      emotions: ["curiosity"],
    });
  }
  // light rain
  else if (weather.chance_of_rain <= 60) {
    addTraits(interpretation, {
      mood: ["peaceful", "reflective"],
      atmosphere: ["gentle rainfall"],
      scenario: ["empty gardens", "forest paths"],
      objects: ["puddles", "paper boats"],
      imagery: ["rippling water", "wet stone"],
      palette: ["silver", "soft grey"],
      lightings: ["diffused daylight"],
      sounds: ["soft rain", "water dripping"],
      textures: ["wet leaves"],
      motion: ["falling raindrops"],
      emotions: ["reflection"],
      pace: ["slow"],
    });
  }
  // moderate rain
  else if (weather.chance_of_rain <= 85) {
    addTraits(interpretation, {
      mood: ["melancholic"],
      atmosphere: ["steady rainfall"],
      scenario: ["empty streets", "misty forests"],
      objects: ["open umbrella", "lanterns"],
      imagery: ["flowing streams", "mist"],
      palette: ["slate blue", "grey"],
      lightings: ["muted daylight"],
      sounds: ["constant rainfall"],
      textures: ["rain soaked wood"],
      motion: ["water flowing", "branches swaying"],
      emotions: ["longing"],
      pace: ["steady"],
    });
  }

  // heavy rain
  else {
    addTraits(interpretation, {
      mood: ["intense"],
      atmosphere: ["pouring rain"],
      scenario: ["flooded paths"],
      objects: ["floating lanterns", "broken bridges"],
      imagery: ["overflowing rivers", "dark clouds"],
      symbols: ["water"],
      palette: ["charcoal", "deep blue"],
      lightings: ["storm dimness"],
      sounds: ["heavy rain", "distant thunder"],
      textures: ["soaked stone"],
      motion: ["rushing water", "wind driven rain"],
      emotions: ["awe"],
      pace: ["urgent"],
    });
  }

  // =================================================
  // Wind
  // =================================================

  // still air

  if (weather.windSpeed <= 5) {
    addTraits(interpretation, {
      mood: ["tranquil", "motionless"],
      atmosphere: ["air resting in perfect silence"],
      scenario: ["abandoned courtyards", "silent gardens"],
      objects: ["still ponds", "unlit lanterns"],
      imagery: ["glassy water", "motionless trees"],
      lightings: ["crisp morning light"],
      sounds: ["deep silence", "distant birds"],
      textures: ["calm water", "warm stone"],
      motion: ["floating dust"],
      emotions: ["serenity", "reflection"],
      pace: ["still"],
    });
  }

  // gentle breeze
  else if (weather.windSpeed <= 15) {
    addTraits(interpretation, {
      mood: ["peaceful", "hopeful"],
      atmosphere: ["a soft wandering breeze"],
      scenario: ["flower fields", "rolling hills"],
      objects: ["wind chimes", "open windows", "kites"],
      imagery: ["swaying grass", "floating petals", "dancing butterflies"],
      palette: ["soft green", "sky blue"],
      lightings: ["golden daylight"],
      sounds: ["wind chimes", "rustling leaves"],
      textures: ["soft grass", "linen curtains"],
      motion: ["drifting petals", "rippling wheat", "fluttering curtains"],
      emotions: ["comfort", "optimism"],
      pace: ["gentle"],
    });
  }

  // windy
  else if (weather.windSpeed <= 30) {
    addTraits(interpretation, {
      mood: ["restless", "curious"],
      atmosphere: ["restless air"],
      scenario: ["clifftops", "empty roads", "wide valleys"],
      objects: ["fallen leaves", "scarves", "paper cranes"],
      imagery: ["clouds racing overhead", "trees bending"],
      palette: ["olive", "grey blue"],
      lightings: ["shifting sunlight"],
      sounds: ["whistling winds", "creaking branches"],
      textures: ["rough bark", "cool air"],
      motion: ["rattling leaves", "birds circling"],
      emotions: ["wonder", "anticipation"],
      pace: ["wandering"],
    });
  }

  // strong wind
  else if (weather.windSpeed <= 50) {
    addTraits(interpretation, {
      mood: ["uneasy", "determined"],
      atmosphere: ["powerful gusts"],
      scenario: ["mountain passes", "stormy coastlines"],
      objects: ["tattered flags", "old windmills"],
      imagery: ["towering waves", "windswept trees"],
      symbols: ["flight"],
      palette: ["steel blue", "dark green"],
      lightings: ["moving shadows"],
      sounds: ["howling wind", "crashing branches"],
      textures: ["rough wood", "cold air"],
      motion: [
        "Branches whipping",
        "waves crashing",
        "birds fighting the wind",
      ],
      emotions: ["resilience", "uncertainty"],
      pace: ["urgent"],
    });
  }

  // gale
  else {
    addTraits(interpretation, {
      mood: ["overwhelming", "chaotic"],
      atmosphere: ["roaring winds"],
      scenario: [
        "abandoned lighthouses",
        "windswept cliffs",
        "forgotten harbors",
      ],
      objects: ["broken sails", "fallen branches", "shattered windows"],
      imagery: ["spiralling clouds", "flying debris", "towering waves"],
      symbols: ["change", "freedom"],
      palette: ["charcoal", "storm grey", "deep navy"],
      lightings: ["flashes through dark clouds"],
      sounds: ["roaring winds", "crashing waves", "groaning  wood"],
      textures: ["rain soaked timber", "cold stone"],
      motion: ["everything in motion", "spiralling leaves", "racing clouds"],
      emotions: ["awe", "fear"],
      pace: ["frantic"],
    });
  }

  // =================================================
  // Visibility
  // =================================================

  // Crystal clear

  if (weather.vis_km >= 15) {
    addTraits(interpretation, {
      mood: ["clear minded", "limitless"],
      atmosphere: ["crisp air", "boundless horizons"],
      scenario: ["mountain overlooks", "endless plains"],
      objects: ["distant towers", "soaring birds"],
      imagery: ["sharp horizons", "vast skies", "endless landscapes"],
      symbols: ["horizon"],
      palette: ["azure", "gold", "emerald"],
      lightings: ["brilliant daylight"],
      sounds: ["distant birdsong", "open wind"],
      textures: ["clean air", "sun warmed stone"],
      motion: ["birds gliding", "slow moving clouds"],
      emotions: ["clarity", "possibility"],
      pace: ["steady"],
    });
  }

  // Clear
  else if (weather.vis_km >= 10) {
    addTraits(interpretation, {
      mood: ["peaceful", "hopeful"],
      atmosphere: ["fresh open air"],
      scenario: ["rolling fields", "woodland paths"],
      objects: ["wildflowers", "wooden fences"],
      imagery: ["clear skies", "gentle hills"],
      symbols: ["pathways"],
      palette: ["soft green", "sky blue"],
      lightings: ["warm daylight"],
      sounds: ["rustling leaves", "distant birds"],
      textures: ["soft grass"],
      motion: ["floating petals"],
      emotions: ["contentment"],
      pace: ["gentle"],
    });
  }

  //hazy
  else if (weather.vis_km >= 5) {
    addTraits(interpretation, {
      mood: ["dreamlike", "nostalgic"],
      atmosphere: ["gentle haze"],
      scenario: ["quiet villages", "sleeping orchards"],
      objects: ["old fences", "weathered gates"],
      imagery: ["blurred silhouettes", "soft distant hills"],
      symbols: ["memories"],
      palette: ["muted gold", "dusty blue", "pale grey"],
      lightings: ["soft diffused light"],
      sounds: ["distant bells", "quiet footsteps"],
      textures: ["warm dust"],
      motion: ["slow drifting haze"],
      emotions: ["longing", "reflection"],
      pace: ["unhurried"],
    });
  }

  // foggy
  else if (weather.vis_km >= 2) {
    addTraits(interpretation, {
      mood: ["mysterious", "introspective"],
      atmosphere: ["thick mist"],
      scenario: ["forgotten forests", "empty bridges"],
      objects: ["lanterns", "hidden paths"],
      imagery: ["trees fading into fog", "vanishing footsteps"],
      symbols: ["veil"],
      palette: ["silver", "grey", "soft white"],
      lightings: ["muted glow"],
      sounds: ["muffled echoes", "dripping water"],
      textures: ["cool mist", "wet stone"],
      motion: ["rolling fog"],
      emotions: ["curiosity", "uncertainty"],
      pace: ["hesitant"],
    });
  }

  // extremly foggy
  else {
    addTraits(interpretation, {
      mood: ["lost", "ethereal"],
      atmosphere: ["near total whiteout"],
      scenario: ["endless marshes", "forgotten ruins"],
      objects: ["ghostly lanterns", "half seen statues"],
      imagery: ["figures dissolving into white", "invisible horizons"],
      symbols: ["the unknown"],
      palette: ["white", "ash grey", "pale silver"],
      lightings: ["ghostly glow"],
      sounds: ["distant whispers", "soft water drops"],
      textures: ["cold mist", "damp stone"],
      motion: ["swirling fog"],
      emotions: ["wonder", "uncertainty"],
      pace: ["slow"],
    });
  }

  // =================================================
  // Moon Phase
  // =================================================

  // new moon

  if (weather.moonphase === "New Moon") {
    addTraits(interpretation, {
      mood: ["introspective", "quiet"],
      atmosphere: ["velvet darkness"],
      scenario: ["silent forests", "empty fields"],
      objects: ["unlit lanterns", "sealed gates"],
      imagery: ["hidden paths", "star filled sky"],
      symbols: ["beginnings", "secrets"],
      palette: ["black", "midnight blue"],
      lightings: ["starlight"],
      sounds: ["crickets", "distant owl"],
      textures: ["cool earth"],
      motion: ["slow drifting shadows"],
      emotions: ["anticipation", "reflection"],
      pace: ["still"],
    });
  }

  // waxing crescent
  else if (weather.moonphase === "Waxing Crescent") {
    addTraits(interpretation, {
      mood: ["hopeful", "curious"],
      atmosphere: ["quiet expectation"],
      scenario: ["garden paths", "young orchards"],
      objects: ["sprouting branches", "small lanterns"],
      imagery: ["silver crescents", "opening flowers"],
      symbols: ["growth"],
      palette: ["soft silver", "sage green"],
      lightings: ["gentle moonlight"],
      sounds: ["night breeze"],
      textures: ["fresh leaves"],
      motion: ["floating petals"],
      emotions: ["optimism"],
      pace: ["gentle"],
    });
  }

  // first quarter
  else if (weather.moonphase === "First Quarter") {
    addTraits(interpretation, {
      mood: ["determined", "balanced"],
      atmosphere: ["cool evening air"],
      scenario: ["stone bridges", "crossroads"],
      objects: ["compasses", "bridges"],
      imagery: ["half lit landscapes"],
      symbols: ["choices"],
      palette: ["silver", "blue grey"],
      lightings: ["angled moonlight"],
      sounds: ["flowing streams"],
      textures: ["smooth stone"],
      motion: ["moving water"],
      emotions: ["confidence"],
      pace: ["steady"],
    });
  }

  // waxing gibbous
  else if (weather.moonphase === "Waxing Gibbous") {
    addTraits(interpretation, {
      mood: ["expectant", "dreamlike"],
      atmosphere: ["glowing night"],
      scenario: ["flower fields", "quiet lakes"],
      objects: ["white lilies", "floating lanterns"],
      imagery: ["silver reflections"],
      symbols: ["becoming"],
      palette: ["silver", "soft gold"],
      lightings: ["bright moonlight"],
      sounds: ["gentle water"],
      textures: ["cool grass"],
      motion: ["rippling reflections"],
      emotions: ["wonder"],
      pace: ["calm"],
    });
  }

  // full moon
  else if (weather.moonphase === "Full Moon") {
    addTraits(interpretation, {
      mood: ["enchanted", "luminous"],
      atmosphere: ["moonlit stillness"],
      scenario: ["ancient ruins", "mirror lakes", "quiet meadows"],
      objects: ["white wolves", "lanterns", "moonflowers"],
      imagery: ["long silver shadows", "glowing water"],
      symbols: ["wholeness", "transformation"],
      palette: ["silver", "pearl", "midnight blue"],
      lightings: ["brilliant moonlight"],
      sounds: ["soft wind", "distant water"],
      textures: ["cool stone"],
      motion: ["drifting clouds"],
      emotions: ["awe", "peace"],
      pace: ["slow"],
    });
  }

  // waning gibbous
  else if (weather.moonphase === "Waning Gibbous") {
    addTraits(interpretation, {
      mood: ["reflective", "peaceful"],
      atmosphere: ["fading glow"],
      scenario: ["empty courtyards", "sleeping villages"],
      objects: ["old books", "stone benches"],
      imagery: ["soft fading light"],
      symbols: ["gratitude"],
      palette: ["grey blue", "silver"],
      lightings: ["gentle moonlight"],
      sounds: ["night insects"],
      textures: ["aged wood"],
      motion: ["falling leaves"],
      emotions: ["contentment"],
      pace: ["gentle"],
    });
  }

  // last quarter
  else if (weather.moonphase === "Last Quarter") {
    addTraits(interpretation, {
      mood: ["contemplative", "resolute"],
      atmosphere: ["cool silence"],
      scenario: ["mountain paths", "old shrines"],
      objects: ["stone steps", "weathered statues"],
      imagery: ["misty values"],
      symbols: ["letting go"],
      palette: ["slate", "grey"],
      lightings: ["dim moonlight"],
      sounds: ["distant wind"],
      textures: ["cold stone"],
      motion: ["slow mist"],
      emotions: ["acceptance"],
      pace: ["steady"],
    });
  }

  // waning crescent
  else {
    addTraits(interpretation, {
      mood: ["quiet", "ethereal"],
      atmosphere: ["night before dawn"],
      scenario: ["sleeping forests", "forgotten garden"],
      objects: ["dew", "feathers"],
      imagery: ["stars fading into morning"],
      symbols: ["renewal"],
      palette: ["lavender", "soft blue", "silver"],
      lightings: ["faint moonlight"],
      sounds: ["early birds"],
      textures: ["morning dew"],
      motion: ["floating feathers"],
      emotions: ["hope", "peace"],
      pace: ["lingering"],
    });
  }

  // =================================================
  // Time of Day
  // =================================================

  // dawn

  if (weather.timeOfDay === "dawn") {
    addTraits(interpretation, {
      mood: ["hopeful", "awakening"],
      atmosphere: ["misty stillness"],
      scenario: ["dew covered meadows", "sleeping villages"],
      objects: ["morning dew", "early birds"],
      imagery: ["first light touching hills", "golden mist"],
      symbols: ["beginnings"],
      palette: ["soft pink", "pale gold", "mist blue"],
      lightings: ["first light"],
      sounds: ["birdsong", "gentle breeze"],
      textures: ["cool grass", "morning dew"],
      motion: ["mist drifting"],
      emotions: ["renewal"],
      pace: ["gentle"],
    });
  }

  // morning
  else if (weather.timeOfDay === "morning") {
    addTraits(interpretation, {
      mood: ["optimistic", "peaceful"],
      atmosphere: ["fresh morning air"],
      scenario: ["orchards", "quiet gardens"],
      objects: ["wild flowers", "small streams"],
      imagery: ["long shadows", "sunlit leaves"],
      symbols: ["possibility"],
      palette: ["green", "sky blue", "gold"],
      lightings: ["warm sunglight"],
      sounds: ["birds", "flowing water"],
      textures: ["fresh leaves"],
      motion: ["fluttering butterflies"],
      emotions: ["contentment"],
      pace: ["steady"],
    });
  }

  // afternoon
  else if (weather.timeOfDay === "afternoon") {
    addTraits(interpretation, {
      mood: ["comfortable", "content"],
      atmosphere: ["warm afternoon"],
      scenario: ["rolling fields", "quiet rivers"],
      objects: ["oak trees", "stone paths"],
      imagery: ["golden fields"],
      symbols: ["abundance"],
      palette: ["amber", "green", "cream"],
      lightings: ["bright daylight"],
      sounds: ["wind cutting through grass"],
      textures: ["warm stone"],
      motion: ["floating seeds"],
      emotions: ["ease"],
      pace: ["unhurried"],
    });
  }

  // evening
  else if (weather.timeOfDay === "evening") {
    addTraits(interpretation, {
      mood: ["reflective", "nostalgic"],
      atmosphere: ["cool evening air"],
      scenario: ["quiet streets", "lakeshores"],
      objects: ["lanterns", "wooden benches"],
      imagery: ["lengthening shadows", "orange sky"],
      symbols: ["return"],
      palette: ["orange", "crimson", "violet"],
      lightings: ["golden hour"],
      sounds: ["crickets", "distant bells"],
      textures: ["cool wood"],
      motion: ["falling leaves"],
      emotions: ["gratitude"],
      pace: ["slow"],
    });
  }

  //twlight
  else if (weather.timeOfDay === "twilight") {
    addTraits(interpretation, {
      mood: ["dreamlike", "mysterious"],
      atmosphere: ["world between day and night"],
      scenario: ["misty forests", "mirror lakes"],
      objects: ["glowing lanterns", "fireflies"],
      imagery: ["purple sky", "silver reflections"],
      symbols: ["transition"],
      palette: ["lavender", "indigo", "silver"],
      lightings: ["fading glow"],
      sounds: ["distant owls"],
      textures: ["cool mist"],
      motion: ["floating lights"],
      emotions: ["wonder"],
      pace: ["lingering"],
    });
  }

  // night
  else if (weather.timeOfDay === "night") {
    addTraits(interpretation, {
      mood: ["serene", "introspective"],
      atmosphere: ["quiet night"],
      scenario: ["moonlit forests", "sleeping villages"],
      objects: ["stars", "lanterns"],
      imagery: ["silver paths", "dark lakes"],
      symbols: ["dreams"],
      palette: ["midnight blue", "silver", "black"],
      lightings: ["moonlight"],
      sounds: ["night insects", "soft wind"],
      textures: ["cool stone"],
      motion: ["drifting clouds"],
      emotions: ["peace"],
      pace: ["still"],
    });
  }

  // midnight
  else {
    addTraits(interpretation, {
      mood: ["surreal", "ethereal"],
      atmosphere: ["silent darkness"],
      scenario: ["forgotten ruins", "floating islands"],
      objects: ["constellations", "old clocks"],
      imagery: ["impossible skies", "endless stars"],
      symbols: ["the subconscious"],
      palette: ["deep indigo", "silver", "black"],
      lightings: ["starlight"],
      sounds: ["echoes", "whispering wind"],
      textures: ["cold marble"],
      motion: ["floating feathers"],
      emotions: ["awe"],
      pace: ["weightless"],
    });
  }

  // =================================================
  // Sun position
  // =================================================

  // before sunrise

  if (weather.sunPosition === "before_sunrise") {
    addTraits(interpretation, {
      atmosphere: ["world holding its breath"],
      imagery: ["deep blue horizon"],
      palette: ["navy", "soft violet"],
      lightings: ["faint pre dawn glow"],
      sounds: ["distant birds awakening"],
    });
  }

  // sunrise
  else if (weather.sunPosition === "sunrise") {
    addTraits(interpretation, {
      atmosphere: ["golden awakening"],
      imagery: ["light spilling over hills"],
      palette: ["gold", "peach", "soft pink"],
      lightings: ["golden rays"],
      symbols: ["beginnings"],
      motion: ["light spreading"],
    });
  }

  // daytime
  else if (weather.sunPosition === "day") {
    addTraits(interpretation, {
      atmosphere: ["bright openness"],
      imagery: ["defined shadows"],
      palette: ["blue", "green", "gold"],
      lightings: ["clear sunlight"],
      sounds: ["birdsong"],
    });
  }

  // sunset
  else if (weather.sunPosition === "sunset") {
    addTraits(interpretation, {
      atmosphere: ["fading warmth"],
      imagery: ["burning horizon", "long shadows"],
      symbols: ["closure"],
      palette: ["orange", "crimson", "amber"],
      lightings: ["golden sunset"],
      motion: ["slow drifting leaves"],
    });
  }

  // after sunset
  else {
    addTraits(interpretation, {
      atmosphere: ["blue hour"],
      imagery: ["darkening silhouettes"],
      palette: ["deep blue", "violet"],
      lightings: ["last traces of light"],
      sounds: ["evening insects"],
      motion: ["slow rising stars"],
    });
  }

  // =================================================
  // Rare Events
  // =================================================

  // extremely hot + Strong wind

  if (weather.temperature >= 38 && weather.windSpeed >= 35) {
    addTraits(interpretation, {
      mood: ["relentless"],
      atmosphere: ["burning winds"],
      imagery: ["waves of shimmering air", "dust devils"],
      symbols: ["fire"],
      palette: ["burnt orange", "crimson"],
      sounds: ["howling hot wind"],
      textures: ["sun scorched stone"],
      emotions: ["endurance"],
      pace: ["urgent"],
    });
  }

  if (
    weather.moonphase === "Full Moon" &&
    weather.cloud <= 20 &&
    weather.vis_km >= 10
  ) {
    addTraits(interpretation, {
      mood: ["enchanted"],
      atmosphere: ["crystal clear moonlit night"],
      imagery: ["silver rivers", "glowing forests"],
      symbols: ["wholeness", "dream"],
      palette: ["silver", "midnight blue"],
      lightings: ["radiant moonlight"],
      sounds: ["soft wind", "night birds"],
      textures: ["cool marble"],
      emotions: ["wonder", "peace"],
      pace: ["weightless"],
    });
  }

  if (weather.moonphase === "Full Moon" && weather.vis_km <= 3) {
    addTraits(interpretation, {
      mood: ["surreal"],
      atmosphere: ["glowing mist"],
      imagery: ["silver fog", "vanishing paths"],
      symbols: ["illusion"],
      palette: ["white", "silver"],
      lightings: ["diffused moonlight"],
      sounds: ["muffled echoes"],
      emotions: ["curiosity"],
      pace: ["slow"],
    });
  }

  if (weather.temperature <= 0 && weather.moonphase === "Full Moon") {
    addTraits(interpretation, {
      atmosphere: ["crystalline silence"],
      imagery: ["ice reflecting moonlight"],
      symbols: ["purity"],
      palette: ["ice blue"],
      lightings: ["sparkling moonlight"],
      textures: ["glass like ice"],
      emotions: ["clarity"],
      pace: ["still"],
    });
  }

  if (weather.timeOfDay === "dawn" && weather.chance_of_rain >= 60) {
    addTraits(interpretation, {
      mood: ["renewed"],
      atmosphere: ["fresh washed morning"],
      imagery: ["dew covered flowers", "golden puddles"],
      symbols: ["rebirth"],
      palette: ["emerald", "gold"],
      sounds: ["morning birds"],
      textures: ["wet grass"],
      emotions: ["hope"],
      pace: ["gentle"],
    });
  }

  if (weather.humidity <= 20 && weather.vis_km >= 15) {
    addTraits(interpretation, {
      atmosphere: ["endless clarity"],
      imagery: ["infinite horizon"],
      symbols: ["freedom"],
      palette: ["azure", "sand", "gold"],
      sounds: ["open wind"],
      emotions: ["possibility"],
      pace: ["steady"],
    });
  }

  if (
    weather.windSpeed <= 5 &&
    weather.timeOfDay === "night" &&
    weather.chance_of_rain <= 10
  ) {
    addTraits(interpretation, {
      mood: ["tranquil"],
      atmosphere: ["perfect stillness"],
      imagery: ["motionless lake", "sleeping forest"],
      symbols: ["peace"],
      palette: ["deep blue", "silver"],
      sounds: ["gentle crickets"],
      textures: ["cool air"],
      emotions: ["comfort"],
      pace: ["slow"],
    });
  }

  if (
    weather.sunPosition === "sunset" &&
    weather.cloud >= 20 &&
    weather.cloud <= 60
  ) {
    addTraits(interpretation, {
      mood: ["nostalgic"],
      atmosphere: ["golden glow"],
      imagery: ["burning clouds", "endless fields"],
      symbols: ["farewell"],
      palette: ["amber", "orange", "rose"],
      lightings: ["radiant sunset"],
      emotions: ["gratitude"],
      pace: ["gentle"],
    });
  }

  if (weather.will_it_snow) {
    addTraits(interpretation, {
      mood: ["hushed", "pure"],
      atmosphere: ["snowfall muffling the world"],
      imagery: ["snowflakes drifting through still air"],
      palette: ["white", "silver"],
      textures: ["fresh snow"],
      emotions: ["peace", "wonder"],
      pace: ["gentle"],
    });
  }

  Object.keys(interpretation).forEach((key) => {
    interpretation[key] = [...interpretation[key]];
  });

  return interpretation;
}

function addTraits(target, traits) {
  Object.entries(traits).forEach(([key, values]) => {
    if (!target[key]) {
      console.warn(`Unknown interpretation key: ${key}`);
      return;
    }
    values.forEach((value) => {
      target[key].add(value);
    });
  });
}
export default interpretWeather;
