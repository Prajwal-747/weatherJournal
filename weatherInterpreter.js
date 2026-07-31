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
      scenario: ["abondoned courtyards", "silent gardens"],
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
      emotions: ["resilience", "uncertainity"],
      pace: ["urgent"],
    });
  }

  // gale
  else {
    addTraits(interpretation, {
      mood: ["overwhelming", "chaotic"],
      atmosphere: ["roaring winds"],
      scenario: [
        "abondoned lighthouses",
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

  // clear sky

  // hazy

  // foggy

  // extremly foggy

  // =================================================
  // Moon Phase
  // =================================================

  // new moon

  // waxing crescent

  // first quarter

  // waxing gibbous

  // full moon

  // waning gibbous

  // last quarter

  // waning crescent

  // =================================================
  // Time of Day
  // =================================================

  // dawn

  // morning

  // afternoon

  // evening

  //twlight

  // night

  // midnight

  // =================================================
  // Sun position
  // =================================================

  // before sunrise

  // sunrise

  // daytime

  // sunset

  // after sunset

  // =================================================
  // Rare Events
  // =================================================

  // extremely hot

  // extremely cold

  // 100% rain chance

  // full moon + clear sky

  // heavy storm

  // unusual weather

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
