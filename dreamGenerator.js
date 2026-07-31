async function generateDream(weatherInfo, interpretation) {
  console.log("Request Received");
  const prompt = `
Current Weather Conditions:

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

Scenario:
${interpretation.scenario.join(", ")}

Objects:
${interpretation.objects.join(", ")}

Imagery:
${interpretation.imagery.join(", ")}

Symbols:
${interpretation.symbols.join(", ")}

Palette:
${interpretation.palette.join(", ")}

Lightings:
${interpretation.lightings.join(", ")}

Sounds:
${interpretation.sounds.join(", ")}

Textures:
${interpretation.textures.join(", ")}

Motion:
${interpretation.motion.join(", ")}

Emotions:
${interpretation.emotions.join(", ")}

Pace: 
${interpretation.pace.join(", ")}

Creative Instructions:

Treat the interpretation as a collection of creative ingredients rather than a checklist.
Blend all of the above interpretations into a single cohesive dream.

Do not list these elements directly.

Instead, allow them to subtly shape:
- the setting
- the movement
- the emotional tone
- the sensory details
- the symbolism

Not every element must appear
choose only that ones that naturally belong together.
the dream must feel cohesive rather than generated from a list
the setting should feel tangible before it becomes surreal
dream logic may gradually transform the world, but transitions should feel effortless rather than random

avoid obvious symbolism
allow mystery to remain unexplained.
resist the urge to resolve every image or symbol

Guidelines:
- Maximum 120 words
- Write entirely in second person ("you")
- Focus on atmosphere, emotion, and sensory experience rathar than plot
- use vivid but restrained imagery
- engage multiple senses naturally (sight, sound, touch, movement)
- use metaphors sparingly
- maintain soft dream logic 
- let scenes flow naturally into one another
- keep the tone intimate, calm and mysterious
- avoid dialogue, exposition, cliches.
- avoid horror unless weather strongly suggests it
- avoid mentioning the weather directly.
- do not explain symbolism
- do not use markdown
- do not use hyphens
- use short paragraphs for readability
- end with a quiet, lingering image rather than a dramatic conclusion

Return only valid JSON.

{
  "title": "2-5 word poetic title",
  "dream": "Complete Dream"
}

Title Rules:
- 2 to 5 words.
- maximum 30 characters
- literary
- memorable
- slightly mysterious
- avoid punctuation except apostrophes
- avoid using "The" unless it sounds natural
- do not quote the title

Dream Rules:
- Plain text only
- no markdown
- no explanation
- no notes
- return only the JSON object
- Do not wrap it in markdown
- Do not add any introductory or concluding text
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
      max_output_tokens: 500,
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
