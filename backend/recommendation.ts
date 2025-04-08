import express from 'express';
import { Event } from './models/Event'; 
import { OpenAI } from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // TODO: ADD API KEY TO .ENV (IF PROBLEMS USE DEEPSEE, SAME FORMAT)
});

async function generateRecommendation(event: any): Promise<string> {
  const speakerNames = event.speakers.map((s: any) => s.name).join(', ');

    // TODO: CHECK IF EVENT DATA IS VALID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! (ex: null event, event doesn't exist (COVERED), data passed incorrectly)
  const prompt = `Create a short (2-3 line, ~20 word) recommendation for this event to interest users, using the event details below:
Event Title: ${event.name}
Description: ${event.description}
Speakers: ${speakerNames}

Recommendation:`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 60,
  });

  const messageContent = response.choices[0]?.message?.content;
  if (!messageContent) {
    throw new Error('Failed to generate recommendation: No content in response.');
  }
  return messageContent.trim();
}

router.get('/recommended-event', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const count = await Event.countDocuments();
    const random = Math.floor(Math.random() * count);

    const randomEvent = await Event.findOne().skip(random).populate('speakers', 'name'); // TODO: CHECK IF GPT HAS BETTER ALTERNATIVE TO THIS (EX: GET ALL EVENTS AND THEN RANDOMIZE IN MEMORY)
    if (!randomEvent) {
      res.status(404).json({ error: 'No events found.' });
      return;
    }
    if (randomEvent.speakers.length === 0 || randomEvent.name === '' || randomEvent.description === '') {
        res.status(404).json({ error: 'Event data is NULL'});
    }

    const recommendation = await generateRecommendation(randomEvent);

    res.json({
      event: randomEvent,
      recommendation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error generating recommendation' });
  }
});

export default router;
