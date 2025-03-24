import { Event } from './models/Event';
import { v4 as uuidv4 } from 'uuid';

class EventsManager {

    static async createNewEvent(name: string, date: Date, location: string, ticketPrice: number, description: string) {
        const newEvent = new Event({
            name: name,
            date: date,
            location: location,
            ticketPrice: ticketPrice,
            description: description,
            speakers: [],
            attendees: [],
        });

        return await newEvent.save();
    }

    static async addSpeakerToEvent(event: any, speaker: any) {
        event.speakers.push(speaker._id);
        await event.save();
        speaker.hostedEvents.push(event._id);
        await speaker.save();
    }
}

export default EventsManager;