import { Model } from 'mongoose';
import { Event, IEvent } from './models/Event';
import { v4 as uuidv4 } from 'uuid';

class EventsManager {

    static async createNewEvent(name: string, date: Date, location: string, time: string, price: number, description: string, speakers: string, venue: string, agenda: string): Promise<IEvent> {
        const newEvent = new Event({
            name: name,
            date: date,
            location: location,
            time: time,
            price: price,
            description: description,
            speakers: [],
            attendees: [],
            venue: venue,
            agenda: agenda,
        });

        return await newEvent.save();
    }

    static async addSpeaker(event: any, speaker: any) {
        event.speakers.push(speaker._id);
        await event.save();
        speaker.hostedEvents.push(event._id);
        await speaker.save();
    }

    static async addAttendee(event: any, attendee: any) {
        event.attendees.push(attendee._id);
        await event.save();
        attendee.attendingEvents.push(event._id);
        await attendee.save();
    }

    static async getAllEvents() {
        return await Event.find();
    }
}

export default EventsManager;