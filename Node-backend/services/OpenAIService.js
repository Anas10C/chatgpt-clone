const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.runCompletion = async (prompt, temp) => {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 100,
      stop: ["\n"],
      prompt: prompt,
      temperature: temp
    });
    return completion.data.choices[0].text;
    }