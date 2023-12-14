import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';

import WaveSurfer from 'wavesurfer.js'

@Component({
  selector: 'app-audio-wave',
  standalone: true,
  imports: [],
  templateUrl: './audio-wave.component.html',
  styleUrl: './audio-wave.component.css'
})
export class AudioWaveComponent {

  @Input({required: true}) audioUrl!: string;
  @ViewChild('wave') container!: ElementRef;

  private player!: WaveSurfer;
  isInReproduction = signal(false);

  ngAfterViewInit() {
    this.player = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement
    });
    this.player.on('play', () => this.isInReproduction.set(true));
    this.player.on('pause', () => this.isInReproduction.set(false));
  }

  playPause() {
    this.player.playPause();
  }

}
