import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { AudioPlayerService } from '../../service/audio-player-service/audio-player.service';
import { BaseAudioPlayerFunctions } from '../base/base-audio-player.component';
export declare class MatBasicAudioPlayerComponent extends BaseAudioPlayerFunctions implements OnInit {
    protected cd: ChangeDetectorRef;
    closePlayer: EventEmitter<any>;
    nextSong: EventEmitter<any>;
    previousSong: EventEmitter<any>;
    closeBtn: boolean;
    title: string;
    audioUrl: string;
    displayTitle: boolean;
    autoPlay: boolean;
    disabledSeek: boolean;
    displayVolumeControls: boolean;
    audioPlayerService: AudioPlayerService;
    isFinite: typeof isFinite;
    constructor(cd: ChangeDetectorRef);
    ngOnInit(): void;
    resetSong(): void;
    startClosePlayer(): void;
    volumeChanged(e: any): void;
    startNextSong(): void;
    startPreviousSong(): void;
}
