import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SpeakersService {
  private speakers = [
    { id: 1, name: 'Alice Johnson', expertise: 'Modern Web Development' },
    { id: 2, name: 'Bob Smith', expertise: 'AI and Machine Learning' },
  ];
  private nextId = 3;

  create(speaker: { name: string; expertise: string }) {
    const newSpeaker = { id: this.nextId++, ...speaker };
    this.speakers.push(newSpeaker);
    return newSpeaker;
  }

  findAll() {
    return this.speakers;
  }

  findOne(id: number) {
    const speaker = this.speakers.find((s) => s.id === id);
    if (!speaker) {
      throw new NotFoundException(`Speaker with ID ${id} not found`);
    }
    return speaker;
  }

  update(id: number, updateData: { name?: string; expertise?: string }) {
    const speaker = this.findOne(id);
    Object.assign(speaker, updateData);
    return speaker;
  }

  delete(id: number) {
    const index = this.speakers.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundException(`Speaker with ID ${id} not found`);
    }
    this.speakers.splice(index, 1);
  }
}
