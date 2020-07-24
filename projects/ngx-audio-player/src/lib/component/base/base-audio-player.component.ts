import {
  ChangeDetectorRef,
  ElementRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { Subject } from 'rxjs';
import { Track } from '../../model/track.model';

export class BaseAudioPlayerFunctions {
  @Output()
  trackEnded: Subject<string> = new Subject<string>();

  @ViewChild('audioPlayer', { static: true }) player: ElementRef;
  timeLineDuration: MatSlider;

  iOS =
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !window.MSStream;

  loaderDisplay = false;
  isPlaying = false;
  currentTime = 0;
  volume = 0.1;
  duration = 0.01;

  private startOffsetValue = 0;
  @Input()
  set startOffset(seconds: number) {
    this.startOffsetValue = seconds;
    this.player.nativeElement.currentTime = seconds;
  }
  get startOffset(): number {
    return this.startOffsetValue;
  }

  @Input()
  public endOffset = 0;
  constructor(protected cd: ChangeDetectorRef) {}
  currTimePosChanged(event) {
    this.player.nativeElement.currentTime = event.value;
    this.cd.markForCheck();
  }

  bindPlayerEvent(): void {
    this.player.nativeElement.addEventListener('playing', () => {
      this.isPlaying = true;
      this.duration = Math.floor(this.player.nativeElement.duration);
      this.cd.markForCheck();
    });
    this.player.nativeElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.cd.markForCheck();
    });
    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this.player.nativeElement.currentTime);
      if (this.currentTime >= this.duration - this.endOffset) {
        this.player.nativeElement.pause();
      }
      this.cd.markForCheck();
    });
    this.player.nativeElement.addEventListener('volume', () => {
      this.volume = Math.floor(this.player.nativeElement.volume);
      this.cd.markForCheck();
    });
    if (!this.iOS) {
      this.player.nativeElement.addEventListener('loadstart', () => {
        this.loaderDisplay = true;
      });
      this.cd.markForCheck();
    }
    this.player.nativeElement.addEventListener('loadeddata', () => {
      this.loaderDisplay = false;
      this.duration = Math.floor(this.player.nativeElement.duration);
      this.cd.markForCheck();
    });
    this.player.nativeElement.addEventListener('ended', () => {
      this.trackEnded.next('ended');
      this.cd.markForCheck();
    });
  }

  playBtnHandler(): void {
    if (this.loaderDisplay) {
      return;
    }
    if (this.player.nativeElement.paused) {
      if (this.currentTime >= this.duration - this.endOffset) {
        this.player.nativeElement.currentTime = this.startOffset;
      } else {
        this.player.nativeElement.currentTime = this.currentTime;
      }

      this.player.nativeElement.play();
    } else {
      this.currentTime = this.player.nativeElement.currentTime;
      this.player.nativeElement.pause();
    }
    this.cd.markForCheck();
  }

  play(track?: Track): void {
    if (track) {
      this.startOffset = track.startOffset || 0;
      this.endOffset = track.endOffset || 0;
    }
    this.cd.markForCheck();

    setTimeout(() => {
      this.player.nativeElement.play();
      this.cd.markForCheck();
    }, 50);
  }

  toggleVolume() {
    if (this.volume === 0) {
      this.setVolume(1.0);
    } else {
      this.setVolume(0);
    }
    this.cd.markForCheck();
  }

  protected setVolume(vol) {
    this.volume = vol;
    this.player.nativeElement.volume = this.volume;
    this.cd.markForCheck();
  }
}
