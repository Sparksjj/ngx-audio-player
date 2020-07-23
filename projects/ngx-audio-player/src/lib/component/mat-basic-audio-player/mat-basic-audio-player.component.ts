import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudioPlayerService } from '../../service/audio-player-service/audio-player.service';
import { BaseAudioPlayerFunctions } from '../base/base-audio-player.component';

@Component({
  selector: 'mat-basic-audio-player',
  templateUrl: './mat-basic-audio-player.component.html',
  styleUrls: [
    './mat-basic-audio-player.component.css',
    './../base/base-audio-player.component.css',
  ],
})
export class MatBasicAudioPlayerComponent extends BaseAudioPlayerFunctions
  implements OnInit {
  @Output()
  closePlayer = new EventEmitter();

  @Output()
  nextSong = new EventEmitter();
  @Output()
  previousSong = new EventEmitter();

  @Input()
  closeBtn: boolean;

  @Input()
  title: string;

  @Input()
  audioUrl: string;

  @Input()
  displayTitle = false;

  @Input()
  autoPlay = false;

  @Input()
  displayVolumeControls = true;

  audioPlayerService: AudioPlayerService;

  constructor() {
    super();
    this.audioPlayerService = new AudioPlayerService();
  }

  ngOnInit() {
    this.bindPlayerEvent();

    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.audioPlayerService.setCurrentTime(
        this.player.nativeElement.currentTime
      );
    });

    if (this.autoPlay) {
      super.play();
    }

    this.volume = Math.floor(this.player.nativeElement.volume);
  }

  resetSong(): void {
    this.player.nativeElement.src = this.audioUrl;
  }

  startClosePlayer() {
    this.currentTime = this.player.nativeElement.currentTime;
    this.player.nativeElement.pause();
    this.closePlayer.next();
  }

  volumeChanged(e) {
    this.setVolume(e.value);
    console.log(e.value);
  }

  startNextSong() {
    this.currentTime = this.player.nativeElement.currentTime;
    this.player.nativeElement.pause();
    this.nextSong.next();
  }

  startPreviousSong() {
    this.currentTime = this.player.nativeElement.currentTime;
    this.player.nativeElement.pause();
    this.previousSong.next();
  }
}
