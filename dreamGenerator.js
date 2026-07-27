async function generateDream(weatherInfo, interpretation) {
  console.log("Request Received");
  const prompt = `Current Weather Conditions:
    City: ${weatherInfo.city}, ${weatherInfo.region}, ${weatherInfo.country}
    Date,Time: ${weatherInfo.dateTime}
    Temperature: ${weatherInfo.temperature}°C
    Wind: ${weatherInfo.windSpeed} kph, ${weatherInfo.windDirection}
    Humidity: ${weatherInfo.humidity}%
    Cloud Cover: ${weatherInfo.cloud}%
    feelslike_c: ${weatherInfo.feelslike}°C
    visibility: ${weatherInfo.vis_km} km
    Chance of Rain: ${weatherInfo.chance_of_rain}%
    Chance of Snow: ${weatherInfo.chance_of_snow}%
    Will it Rain: ${weatherInfo.will_it_rain ? "Yes" : "No"}
    Will it Snow: ${weatherInfo.will_it_snow ? "Yes" : "No"}
    Max Temperature: ${weatherInfo.maxtemp}°C
    Min Temperature: ${weatherInfo.mintemp}°C
    avg Temperature: ${weatherInfo.avgtemp}°C
    Sunrise: ${weatherInfo.sunrise}
    Sunset: ${weatherInfo.sunset}
    Moonrise: ${weatherInfo.moonrise}
    Moonset: ${weatherInfo.moonset}
    Moon Phase: ${weatherInfo.moonphase}

    Interpretation:

    Mood:
    ${interpretation.mood.join(", ")}

    Atmosphere:
    ${interpretation.atmosphere.join(", ")}

    Imagery:
    ${interpretation.imagery.join(", ")}

    Symbols:
    ${interpretation.symbols.join(", ")}

    Palette:
    ${interpretation.palette.join(", ")}

    Sounds:
    ${interpretation.sounds.join(", ")}

    Textures:
    ${interpretation.textures.join(", ")}

    Emotions:
    ${interpretation.emotions.join(", ")}

    Pace: 
    ${interpretation.pace.join(", ")}

    Use the interpretation section as creative inspiration.

    Transform the imagery, symbols, sounds, textures, emotions, atmosphere, and palette
    into a dream narrative.

    Do not list them directly.

    weave them naturally into the dream.
    
    Write a short surreal poetic dream narrative inspired by this weather.
    Guidelines:
- Keep it under 120 words
- Use vivid sensory imagery
- Make it surreal but emotionally calm
- Avoid dialogue
- Avoid explanations
- Avoid clichés
- Focus on atmosphere over plot
- Use soft dream logic
- Write in second person ("you")
- Make the dream feel fleeting and mysterious
- Avoid hyphens('-') in the text
- Don't use Markdown formatting in the text
- Use short paragraph breaks for readability.
- less metaphor density.
The dream should feel intimate and personal.
Do not mention the weather directly.
Do not explain symbolism.
Do not make it scary unless storms are extreme.

Return Only valid JSON in this exact format:

{
  "title": "A short poetic title (2-5 words)",
  "dream": "The complete dream"
}

Rules:
- Title should be mysterious and literary.
- Maximum 30 characters.
- Literary and poetic.
- Avoid Punctuation except apostrophes.
- Avoid using "The" unless it sounds natural
- Do not include markdown.
- do not include explanations.
- Return only JSON.
`;

  const response = await fetch("https://ai.hackclub.com/proxy/v1/responses", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${process.env.HACKCLUB_API_KEY}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      model: "~anthropic/claude-sonnet-latest",
      input: [
        {
          type: "message",
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt,
            },
          ],
        },
      ],
      max_output_tokens: 300,
    }),
  });
  const data = await response.json();
  console.log("AI Response:", data);
  const messageOutput = data.output.find((item) => item.type === "message");
  console.log("Message Output:", messageOutput);

  const aiText = messageOutput.content[0].text;
  console.log("AI Text:", aiText);

  const dreamData = JSON.parse(aiText);
  console.log("Parsed Dream: ", dreamData);
  return dreamData;
}

export default generateDream;
