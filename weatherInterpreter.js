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
        imagery: new Set()
    }

    // =================================================
    // Temperature
    // =================================================

    // scorching

    if (weather.temperature >= 40) {
        addTraits(interpretation, {
            mood: [
                "intense",
                "overwhelming"
            ],
            atmosphere: [
                "oppressive heat",
                "air trembling with light"
            ],
            imagery: [
                "mirages",
                "melting wax",
                "cracked earth",
                "endless dunes"
            ],
            symbols: [
                "fire",
                "sun"
            ],
            palette: [
                "deep orange",
                "red",
                "burnt gold"
            ],
            sounds: [
                "dry wind"
            ],
            textures: [
                "cracked stone",
                "sun-baked clay"
            ],
            emotions: [
                "urgency",
                "awe"
            ],
            pace: [
                "heavy"
            ]
        });    
    }

    // hot

    else if (weather.temperature >= 32) {
        addTraits(interpretation, {
            mood: [
                "restless",
                "dreamlike"
            ],
            atmosphere: [
                "heat shimmering in the distance"
            ],
            imagery: [
                "golden dust",
                "sunlit courtyards",
                "mirages"
            ],
            symbols: [
                "fire"
            ],
            palette: [
                "amber",
                "gold",
                "orange"
            ],
            sounds: [
                "cicadas"
            ],
            textures: [
                "warm stone"
            ],
            emotions: [
                "anticipation"
            ],
            pace: [
                "slow"
            ]
        });
    }

    // warm

    else if (weather.temperature >= 25) {
        addTraits(interpretation, {
            mood: [
                "content",
                "bright"
            ],
            atmosphere: [
                "sun-warmed air"
            ],
            imagery: [
                "rolling fields",
                "open windows",
                "breezy hills"
            ],
            symbols: [
                "sunlight"
            ],
            palette: [
                "gold",
                "green",
                "sky blue"
            ],
            sounds: [
                "birdsong"
            ],
            textures: [
                "soft grass"
            ],
            emotions: [
                "optimism"
            ],
            pace: [
                "gentle"
            ]
        })    
    }

    // mild

    else if (weather.temperature >= 18) {
        addTraits(interpretation, {
            mood: [
                "balanced",
                "comfortable"
            ],
            atmosphere: [
                "easy afternoon air"
            ],
            imagery: [
                "quiet gardens",
                "slow rivers",
                "tree lined paths"
            ],
            symbols: [
                "pathways"
            ],
            palette: [
                "cream",
                "green",
                "light gold"
            ],
            sounds: [
                "rustling leaves"
            ],
            textures: [
                "smooth bark"
            ],
            emotions: [
                "contentment"
            ],
            pace: [
                "steady"
            ]
        });
    }

    // cool

    else if (weather.temperature >= 10) {
        addTraits(interpretation, {
            mood: [
                "peaceful"
            ],
            atmosphere: [
                "gentle coolness"
            ],
            imagery: [
                "falling leaves",
                "quiet gardens"
            ],
            symbols: [
                "pathways"
            ],
            palette: [
                "olive",
                "soft blue"
            ],
            sounds: [
                "distant birds"
            ],
            textures: [
                "smooth bark"
            ],
            emotions: [
                "contentment"
            ],
            pace: [
                "slow"
            ]
        });
    }

    // cold

    else if (weather.temperature >= 0) {
        addTraits(interpretation, {
            mood: [
                "reflective",
                "quiet"
            ],
            atmosphere: [
                "cold morning air"
            ],
            imagery: [
                "mist",
                "bare trees",
                "stone pathways"
            ],
            symbols: [
                "lanterns"
            ],
            palette: [
                "grey",
                "blue"
            ],
            sounds: [
                "rustling branches"
            ],
            textures: [
                "cold stone"
            ],
            emotions: [
                "nostalgia"
            ],
            pace: [
                "gentle"
            ]
        });
    }

    // Freezing

    else {
        addTraits(interpretation, {
            mood: [
                "barren",
                "silent"
            ],
            atmosphere: [
                "snowfields",
                "ice-covered lakes",
                "crystalline forests"
            ],
            symbols: [
                "glass",
                "frozen rivers"
            ],
            palette: [
                "white",
                "silver",
                "ice blue"
            ],
            sounds: [
                "creaking ice",
                "distant wind"
            ],
            textures: [
                "powder snow",
                "frost"
            ],
            emotions: [
                "solitude",
                "clarity"
            ],
            pace: [
                "still"
            ]
        });
    }

    // =================================================
    // Humidity
    // =================================================

    // very dry air

    // moderate humidity

    // humid

    // opperessive humidity


    // =================================================
    // Rain
    // =================================================

    // no rain

    // slight chance

    // light rain

    // moderate rain

    // heavy rain

    // storm


    // =================================================
    // Wind
    // =================================================

    // still air

    // gentle breeze

    // windy

    // strong wind

    // gale

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

    Object.keys(interpretation).forEach(key => {
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
        values.forEach(value => {
            target[key].add(value);
        });
    }); 
}
export default interpretWeather;