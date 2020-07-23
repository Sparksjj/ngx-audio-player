import { __decorate, __metadata, __extends } from 'tslib';
import { Output, ViewChild, ElementRef, Input, ɵɵdefineInjectable, Injectable, Component, EventEmitter, Pipe, NgModule } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

var BaseAudioPlayerFunctions = /** @class */ (function () {
    function BaseAudioPlayerFunctions() {
        this.trackEnded = new Subject();
        this.iOS = (/iPad|iPhone|iPod/.test(navigator.platform) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
            !window.MSStream;
        this.loaderDisplay = false;
        this.isPlaying = false;
        this.currentTime = 0;
        this.volume = 0.1;
        this.duration = 0.01;
        this.startOffsetValue = 0;
        this.endOffset = 0;
    }
    Object.defineProperty(BaseAudioPlayerFunctions.prototype, "startOffset", {
        get: function () {
            return this.startOffsetValue;
        },
        set: function (seconds) {
            this.startOffsetValue = seconds;
            this.player.nativeElement.currentTime = seconds;
        },
        enumerable: true,
        configurable: true
    });
    BaseAudioPlayerFunctions.prototype.currTimePosChanged = function (event) {
        this.player.nativeElement.currentTime = event.value;
    };
    BaseAudioPlayerFunctions.prototype.bindPlayerEvent = function () {
        var _this = this;
        this.player.nativeElement.addEventListener('playing', function () {
            _this.isPlaying = true;
            _this.duration = Math.floor(_this.player.nativeElement.duration);
        });
        this.player.nativeElement.addEventListener('pause', function () {
            _this.isPlaying = false;
        });
        this.player.nativeElement.addEventListener('timeupdate', function () {
            _this.currentTime = Math.floor(_this.player.nativeElement.currentTime);
            if (_this.currentTime >= _this.duration - _this.endOffset) {
                _this.player.nativeElement.pause();
            }
        });
        this.player.nativeElement.addEventListener('volume', function () {
            _this.volume = Math.floor(_this.player.nativeElement.volume);
        });
        if (!this.iOS) {
            this.player.nativeElement.addEventListener('loadstart', function () {
                _this.loaderDisplay = true;
            });
        }
        this.player.nativeElement.addEventListener('loadeddata', function () {
            _this.loaderDisplay = false;
            _this.duration = Math.floor(_this.player.nativeElement.duration);
        });
        this.player.nativeElement.addEventListener('ended', function () {
            _this.trackEnded.next('ended');
        });
    };
    BaseAudioPlayerFunctions.prototype.playBtnHandler = function () {
        if (this.loaderDisplay) {
            return;
        }
        if (this.player.nativeElement.paused) {
            if (this.currentTime >= this.duration - this.endOffset) {
                this.player.nativeElement.currentTime = this.startOffset;
            }
            else {
                this.player.nativeElement.currentTime = this.currentTime;
            }
            this.player.nativeElement.play();
        }
        else {
            this.currentTime = this.player.nativeElement.currentTime;
            this.player.nativeElement.pause();
        }
    };
    BaseAudioPlayerFunctions.prototype.play = function (track) {
        var _this = this;
        if (track) {
            this.startOffset = track.startOffset || 0;
            this.endOffset = track.endOffset || 0;
        }
        setTimeout(function () {
            _this.player.nativeElement.play();
        }, 50);
    };
    BaseAudioPlayerFunctions.prototype.toggleVolume = function () {
        if (this.volume === 0) {
            this.setVolume(1.0);
        }
        else {
            this.setVolume(0);
        }
    };
    BaseAudioPlayerFunctions.prototype.setVolume = function (vol) {
        this.volume = vol;
        this.player.nativeElement.volume = this.volume;
    };
    __decorate([
        Output(),
        __metadata("design:type", Subject)
    ], BaseAudioPlayerFunctions.prototype, "trackEnded", void 0);
    __decorate([
        ViewChild('audioPlayer', { static: true }),
        __metadata("design:type", ElementRef)
    ], BaseAudioPlayerFunctions.prototype, "player", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], BaseAudioPlayerFunctions.prototype, "startOffset", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BaseAudioPlayerFunctions.prototype, "endOffset", void 0);
    return BaseAudioPlayerFunctions;
}());

var AudioPlayerService = /** @class */ (function () {
    function AudioPlayerService() {
        // Dynamic update of playlist
        this.tracks = [];
        this.playlistSubject$ = new BehaviorSubject(this.tracks);
        this.currentTrackSubject$ = new BehaviorSubject(this.currentTrack);
        this.currentTimeSubject$ = new BehaviorSubject(this.currentTime);
    }
    AudioPlayerService.prototype.setPlaylist = function (tracks) {
        this.tracks = tracks;
        this.playlistSubject$.next(this.tracks);
    };
    AudioPlayerService.prototype.getPlaylist = function () {
        return this.playlistSubject$.asObservable();
    };
    AudioPlayerService.prototype.setCurrentTrack = function (currentTrack) {
        this.currentTrack = currentTrack;
        this.currentTrackSubject$.next(this.currentTrack);
    };
    AudioPlayerService.prototype.getCurrentTrack = function () {
        return this.currentTrackSubject$.asObservable();
    };
    AudioPlayerService.prototype.setCurrentTime = function (currentTime) {
        this.currentTime = currentTime;
        this.currentTimeSubject$.next(this.currentTime);
    };
    AudioPlayerService.prototype.getCurrentTime = function () {
        return this.currentTimeSubject$.asObservable();
    };
    AudioPlayerService.ɵprov = ɵɵdefineInjectable({ factory: function AudioPlayerService_Factory() { return new AudioPlayerService(); }, token: AudioPlayerService, providedIn: "root" });
    AudioPlayerService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], AudioPlayerService);
    return AudioPlayerService;
}());

var MatAdvancedAudioPlayerComponent = /** @class */ (function (_super) {
    __extends(MatAdvancedAudioPlayerComponent, _super);
    function MatAdvancedAudioPlayerComponent() {
        var _this = _super.call(this) || this;
        _this.displayedColumns = ['title', 'status'];
        _this.dataSource = new MatTableDataSource();
        _this.tracks = [];
        _this.displayTitle = true;
        _this.displayPlaylist = true;
        _this.displayVolumeControls = true;
        _this.pageSizeOptions = [10, 20, 30];
        _this.expanded = true;
        _this.autoPlay = false;
        _this.currentIndex = 0;
        _this.audioPlayerService = new AudioPlayerService();
        return _this;
    }
    Object.defineProperty(MatAdvancedAudioPlayerComponent.prototype, "playlist", {
        set: function (playlist) {
            this.audioPlayerService.setPlaylist(playlist);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatAdvancedAudioPlayerComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: true,
        configurable: true
    });
    MatAdvancedAudioPlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bindPlayerEvent();
        // Subscribe to playlist observer from AudioPlayerService and
        // update the playlist within MatAdvancedAudioPlayerComponent
        this.audioPlayerService.getPlaylist().subscribe(function (tracks) {
            if (tracks !== null && tracks !== []) {
                _this.tracks = tracks;
                _this.initialize();
            }
        });
    };
    MatAdvancedAudioPlayerComponent.prototype.initialize = function () {
        var _this = this;
        // populate indexs for the track and configure
        // material table data source and paginator
        this.setDataSourceAttributes();
        // auto play next track
        this.player.nativeElement.addEventListener('ended', function () {
            _this.nextSong();
        });
        this.player.nativeElement.addEventListener('timeupdate', function () {
            _this.audioPlayerService.setCurrentTime(_this.player.nativeElement.currentTime);
        });
        this.player.nativeElement.currentTime = this.startOffset;
        this.updateCurrentSong();
        if (this.autoPlay) {
            _super.prototype.play.call(this);
        }
    };
    MatAdvancedAudioPlayerComponent.prototype.setDataSourceAttributes = function () {
        var index = 1;
        if (this.tracks) {
            this.tracks.forEach(function (track) {
                track.index = index++;
            });
            this.dataSource = new MatTableDataSource(this.tracks);
            this.dataSource.paginator = this.paginator;
        }
    };
    MatAdvancedAudioPlayerComponent.prototype.nextSong = function () {
        if (this.displayPlaylist === true
            && (((this.currentIndex + 1) % this.paginator.pageSize) === 0
                || (this.currentIndex + 1) === this.paginator.length)) {
            if (this.paginator.hasNextPage()) {
                this.paginator.nextPage();
            }
            else if (!this.paginator.hasNextPage()) {
                this.paginator.firstPage();
            }
        }
        this.currentTime = 0;
        this.duration = 0.01;
        if ((this.currentIndex + 1) >= this.tracks.length) {
            this.currentIndex = 0;
        }
        else {
            this.currentIndex++;
        }
        this.updateCurrentSong();
        this.play(this.nextTrack);
    };
    MatAdvancedAudioPlayerComponent.prototype.previousSong = function () {
        this.currentTime = 0;
        this.duration = 0.01;
        if (!this.checkIfSongHasStartedSinceAtleastTwoSeconds()) {
            if (this.displayPlaylist === true
                && (((this.currentIndex) % this.paginator.pageSize) === 0
                    || (this.currentIndex === 0))) {
                if (this.paginator.hasPreviousPage()) {
                    this.paginator.previousPage();
                }
                else if (!this.paginator.hasPreviousPage()) {
                    this.paginator.lastPage();
                }
            }
            if ((this.currentIndex - 1) < 0) {
                this.currentIndex = (this.tracks.length - 1);
            }
            else {
                this.currentIndex--;
            }
        }
        else {
            this.resetSong();
        }
        this.updateCurrentSong();
        this.play(this.previousTrack);
    };
    MatAdvancedAudioPlayerComponent.prototype.resetSong = function () {
        this.player.nativeElement.src = this.currentTrack.link;
    };
    MatAdvancedAudioPlayerComponent.prototype.selectTrack = function (index) {
        this.currentIndex = index - 1;
        this.updateCurrentSong();
        this.play(this.currentTrack);
    };
    MatAdvancedAudioPlayerComponent.prototype.checkIfSongHasStartedSinceAtleastTwoSeconds = function () {
        return this.player.nativeElement.currentTime > 2;
    };
    MatAdvancedAudioPlayerComponent.prototype.updateCurrentSong = function () {
        this.currentTrack = this.tracks[this.currentIndex];
        this.previousTrack = ((this.currentIndex - 1) >= 0) ? this.tracks[this.currentIndex - 1] : this.tracks[this.tracks.length - 1];
        this.nextTrack = ((this.currentIndex + 1) >= this.tracks.length) ? this.tracks[0] : this.tracks[this.currentIndex + 1];
        this.audioPlayerService.setCurrentTrack(this.currentTrack);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], MatAdvancedAudioPlayerComponent.prototype, "playlist", null);
    __decorate([
        ViewChild(MatPaginator, { static: false }),
        __metadata("design:type", MatPaginator),
        __metadata("design:paramtypes", [MatPaginator])
    ], MatAdvancedAudioPlayerComponent.prototype, "matPaginator", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatAdvancedAudioPlayerComponent.prototype, "displayTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatAdvancedAudioPlayerComponent.prototype, "displayPlaylist", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatAdvancedAudioPlayerComponent.prototype, "displayVolumeControls", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatAdvancedAudioPlayerComponent.prototype, "pageSizeOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatAdvancedAudioPlayerComponent.prototype, "expanded", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatAdvancedAudioPlayerComponent.prototype, "autoPlay", void 0);
    MatAdvancedAudioPlayerComponent = __decorate([
        Component({
            selector: 'mat-advanced-audio-player',
            template: "<mat-card class=\"d-flex justify-content-center ngx-advanced-audio-player z-depth-1 mat-elevation-z2\"\n          style=\"margin: 0px;\">\n\n    <audio #audioPlayer\n           [src]=\"currentTrack?.link\"></audio>\n\n    <button (click)='previousSong();'\n            [disabled]=\"loaderDisplay\"\n            class=\"p-1\"\n            mat-button>\n        <svg width=\"15\"\n             height=\"15\"\n             viewBox=\"0 0 15 15\"\n             fill=\"none\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M6.875 11.25V3.75L1.5625 7.5L6.875 11.25ZM7.1875 7.5L12.5 11.25V3.75L7.1875 7.5Z\"\n                  fill=\"#9098A9\" />\n        </svg>\n\n    </button>\n\n    <button (click)='playBtnHandler();'\n            [disabled]=\"loaderDisplay\"\n            class=\"p-1 play-pause\"\n            mat-button>\n\n        <svg *ngIf=\"loaderDisplay\"\n             height=\"34px\"\n             preserveAspectRatio=\"xMidYMid\"\n             style=\"margin: auto; display: block; shape-rendering: auto;\"\n             viewBox=\"0 0 100 100\"\n             width=\"34px\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <g transform=\"rotate(0 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.9166666666666666s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(30 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.8333333333333334s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(60 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.75s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(90 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.6666666666666666s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(120 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.5833333333333334s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(150 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.5s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(180 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.4166666666666667s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(210 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.3333333333333333s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(240 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.25s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(270 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.16666666666666666s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(300 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.08333333333333333s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(330 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"0s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n        </svg>\n\n        <mat-icon *ngIf=\"!loaderDisplay && !isPlaying\"\n                  aria-hidden=\"true\"\n                  class=\"play-track\">\n            <!-- Play icon (play_arrow) -->\n            <svg height=\"32\"\n                 viewBox=\"0 0 24 24\"\n                 width=\"32\"\n                 xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8 5v14l11-7z\" />\n                <path d=\"M0 0h24v24H0z\"\n                      fill=\"none\" />\n            </svg>\n        </mat-icon>\n        <mat-icon *ngIf=\"!loaderDisplay && isPlaying\"\n                  aria-hidden=\"true\"\n                  class=\"pause-track\">\n            <!-- Pause icon (pause) -->\n            <svg height=\"32\"\n                 viewBox=\"0 0 24 24\"\n                 width=\"32\"\n                 xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M6 19h4V5H6v14zm8-14v14h4V5h-4z\" />\n                <path d=\"M0 0h24v24H0z\"\n                      fill=\"none\" />\n            </svg>\n        </mat-icon>\n    </button>\n\n    <button (click)='nextSong();'\n            [disabled]=\"loaderDisplay\"\n            class=\"p-1 skip-next\"\n            mat-button>\n        <svg width=\"15\"\n             height=\"15\"\n             viewBox=\"0 0 15 15\"\n             fill=\"none\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M8.125 3.75L8.125 11.25L13.4375 7.5L8.125 3.75ZM7.8125 7.5L2.5 3.75L2.5 11.25L7.8125 7.5Z\"\n                  fill=\"#9098A9\" />\n        </svg>\n\n    </button>\n\n    <div class=\"col\">\n        <div class=\"d-flex flex-fill justify-content-center\">\n            <div class=\"d-none d-sm-block py-3 px-1\"\n                 style=\"font-size: 12px\">\n                <span *ngIf=\"duration !== 0.01\">\n                    {{currentTime-startOffset | secondsToMinutes}}\n                </span>\n            </div>\n            <mat-slider (change)=\"currTimePosChanged($event)\"\n                        [min]=\"startOffset\"\n                        class=\"d-none d-sm-block flex-fill p-1\"\n                        max=\"{{duration-endOffset}}\"\n                        style=\"width: 100%\"\n                        value=\"{{currentTime}}\"></mat-slider>\n\n            <div class=\"py-3 px-1\"\n                 style=\"font-size: 12px; text-align: right\">\n                <span *ngIf=\"duration !== 0.01\">\n                    -{{duration-endOffset-currentTime | secondsToMinutes }}\n                </span>\n            </div>\n        </div>\n    </div>\n    <button (click)='toggleVolume();'\n            *ngIf=\"displayVolumeControls\"\n            class=\"p-1 volume\"\n            mat-button>\n        <mat-icon *ngIf=\"volume === 0\"\n                  aria-hidden=\"true\"\n                  class=\"volume-mute\">\n            <!-- Volume mute icon (volume_off) -->\n            <svg height=\"28\"\n                 viewBox=\"0 0 24 24\"\n                 width=\"28\"\n                 xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z\" />\n                <path d=\"M0 0h24v24H0z\"\n                      fill=\"none\" />\n            </svg>\n        </mat-icon>\n        <mat-icon *ngIf=\"volume > 0\"\n                  aria-hidden=\"true\"\n                  class=\"volume-up\">\n            <!-- Volume up icon (volume_up) -->\n            <svg height=\"28\"\n                 viewBox=\"0 0 24 24\"\n                 width=\"28\"\n                 xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z\" />\n                <path d=\"M0 0h24v24H0z\"\n                      fill=\"none\" />\n            </svg>\n        </mat-icon>\n    </button>\n</mat-card>\n\n<mat-card *ngIf=\"displayTitle\"\n          class=\"mat-elevation-z1\">\n    <div style=\"text-align: center;\">\n        <div style=\"margin: 1px 2px; padding: 1em\">\n            <span *ngIf=\"!isPlaying\">{{ currentTrack?.title }}</span>\n            <marquee *ngIf=\"isPlaying\"\n                     behavior=\"scroll\"\n                     direction=\"left\">{{ currentTrack?.title\n                }}\n            </marquee>\n        </div>\n        <div class=\"clear\"></div>\n    </div>\n</mat-card>\n\n<mat-accordion *ngIf=\"displayPlaylist\">\n    <mat-expansion-panel [expanded]=\"expanded\">\n        <mat-expansion-panel-header>\n            Play List\n        </mat-expansion-panel-header>\n        <table [dataSource]=\"dataSource\"\n               class=\"mat-elevation-z6\"\n               mat-table>\n            <ng-container matColumnDef=\"title\">\n                <th *matHeaderCellDef\n                    mat-header-cell> Title</th>\n                <td (click)=\"selectTrack(element.index)\"\n                    *matCellDef=\"let element\"\n                    mat-cell>\n                    {{element.title}}\n                </td>\n            </ng-container>\n            <ng-container matColumnDef=\"status\">\n                <th *matHeaderCellDef\n                    mat-header-cell></th>\n                <td *matCellDef=\"let element\"\n                    mat-cell>\n                    <div *ngIf=\"currentTrack?.title === element.title\">\n                        <!-- <mat-icon *ngIf=\"isPlaying\" aria-hidden=\"true\">\n                          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M6 19h4V5H6v14zm8-14v14h4V5h-4z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>\n                        </mat-icon> -->\n                        <mat-icon *ngIf=\"isPlaying\"\n                                  aria-hidden=\"true\"\n                                  class=\"currently-playing\">\n                            <!-- Play icon (play_arrow) -->\n                            <svg height=\"24\"\n                                 viewBox=\"0 0 24 24\"\n                                 width=\"24\"\n                                 xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M0 0h24v24H0z\"\n                                      fill=\"none\" />\n                                <path d=\"M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z\" />\n                            </svg>\n                        </mat-icon>\n                    </div>\n                </td>\n            </ng-container>\n            <tr *matHeaderRowDef=\"displayedColumns\"\n                mat-header-row></tr>\n            <tr *matRowDef=\"let row; columns: displayedColumns;\"\n                class=\"mat-select-content\"\n                mat-row></tr>\n        </table>\n        <mat-paginator [pageSizeOptions]=\"pageSizeOptions\"\n                       showFirstLastButtons></mat-paginator>\n    </mat-expansion-panel>\n</mat-accordion>\n",
            styles: ["table{width:100%}.ngx-advanced-audio-player{min-width:325px}.material-icons{font-size:16px!important}mat-icon>.currently-playing{width:16px!important}.play-pause{border-left:2px solid rgba(0,0,0,.1);border-right:2px solid rgba(0,0,0,.1)}.volume{border-left:2px solid rgba(0,0,0,.1)}.skip-next{border-right:2px solid rgba(0,0,0,.1)}", "@import url(https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap-grid.min.css);mat-card,mat-slider{padding:0!important}button:focus,button:hover{outline:0!important}svg{vertical-align:top}mat-card{background:rgba(0,0,0,.02)}mat-icon>.currently-playing{height:16px!important;width:16px!important}"]
        }),
        __metadata("design:paramtypes", [])
    ], MatAdvancedAudioPlayerComponent);
    return MatAdvancedAudioPlayerComponent;
}(BaseAudioPlayerFunctions));

var MatBasicAudioPlayerComponent = /** @class */ (function (_super) {
    __extends(MatBasicAudioPlayerComponent, _super);
    function MatBasicAudioPlayerComponent() {
        var _this = _super.call(this) || this;
        _this.closePlayer = new EventEmitter();
        _this.nextSong = new EventEmitter();
        _this.previousSong = new EventEmitter();
        _this.displayTitle = false;
        _this.autoPlay = false;
        _this.displayVolumeControls = true;
        _this.audioPlayerService = new AudioPlayerService();
        return _this;
    }
    MatBasicAudioPlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bindPlayerEvent();
        this.player.nativeElement.addEventListener('timeupdate', function () {
            _this.audioPlayerService.setCurrentTime(_this.player.nativeElement.currentTime);
        });
        if (this.autoPlay) {
            _super.prototype.play.call(this);
        }
        this.volume = Math.floor(this.player.nativeElement.volume);
    };
    MatBasicAudioPlayerComponent.prototype.resetSong = function () {
        this.player.nativeElement.src = this.audioUrl;
    };
    MatBasicAudioPlayerComponent.prototype.startClosePlayer = function () {
        this.currentTime = this.player.nativeElement.currentTime;
        this.player.nativeElement.pause();
        this.closePlayer.next();
    };
    MatBasicAudioPlayerComponent.prototype.volumeChanged = function (e) {
        this.setVolume(e.value);
        console.log(e.value);
    };
    MatBasicAudioPlayerComponent.prototype.startNextSong = function () {
        this.currentTime = this.player.nativeElement.currentTime;
        this.player.nativeElement.pause();
        this.nextSong.next();
    };
    MatBasicAudioPlayerComponent.prototype.startPreviousSong = function () {
        this.currentTime = this.player.nativeElement.currentTime;
        this.player.nativeElement.pause();
        this.previousSong.next();
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MatBasicAudioPlayerComponent.prototype, "closePlayer", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MatBasicAudioPlayerComponent.prototype, "nextSong", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MatBasicAudioPlayerComponent.prototype, "previousSong", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MatBasicAudioPlayerComponent.prototype, "closeBtn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MatBasicAudioPlayerComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MatBasicAudioPlayerComponent.prototype, "audioUrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatBasicAudioPlayerComponent.prototype, "displayTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatBasicAudioPlayerComponent.prototype, "autoPlay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatBasicAudioPlayerComponent.prototype, "displayVolumeControls", void 0);
    MatBasicAudioPlayerComponent = __decorate([
        Component({
            selector: 'mat-basic-audio-player',
            template: "<div class=\"d-flex ngx-basic-audio-player z-depth-1\">\n    <audio #audioPlayer\n           [src]=\"audioUrl\"></audio>\n\n    <button (click)='startPreviousSong();'\n            [disabled]=\"loaderDisplay\"\n            class=\"p-1 ngx-basic-audio-player-button\">\n        <svg width=\"15\"\n             height=\"15\"\n             viewBox=\"0 0 15 15\"\n             fill=\"none\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M6.875 11.25V3.75L1.5625 7.5L6.875 11.25ZM7.1875 7.5L12.5 11.25V3.75L7.1875 7.5Z\"\n                  fill=\"#9098A9\" />\n        </svg>\n\n    </button>\n\n    <button (click)='playBtnHandler();'\n            [disabled]=\"loaderDisplay\"\n            class=\"ngx-basic-audio-player-button ml-1 mr-1\">\n\n        <svg *ngIf=\"loaderDisplay\"\n             height=\"34px\"\n             preserveAspectRatio=\"xMidYMid\"\n             style=\"margin: auto; display: block; shape-rendering: auto;\"\n             viewBox=\"0 0 100 100\"\n             width=\"34px\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <g transform=\"rotate(0 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.9166666666666666s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(30 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.8333333333333334s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(60 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.75s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(90 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.6666666666666666s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(120 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.5833333333333334s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(150 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.5s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(180 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.4166666666666667s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(210 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.3333333333333333s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(240 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.25s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(270 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.16666666666666666s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(300 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"-0.08333333333333333s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n            <g transform=\"rotate(330 50 50)\">\n                <rect fill=\"#7a7a7a\"\n                      height=\"12\"\n                      rx=\"3\"\n                      ry=\"6\"\n                      width=\"6\"\n                      x=\"47\"\n                      y=\"20\">\n                    <animate attributeName=\"opacity\"\n                             begin=\"0s\"\n                             dur=\"1s\"\n                             keyTimes=\"0;1\"\n                             repeatCount=\"indefinite\"\n                             values=\"1;0\" />\n                </rect>\n            </g>\n        </svg>\n\n        <div *ngIf=\"!loaderDisplay && !isPlaying\"\n             aria-hidden=\"true\"\n             class=\"play-track\">\n            <svg width=\"28\"\n                 height=\"28\"\n                 viewBox=\"0 0 28 28\"\n                 fill=\"none\"\n                 xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"14\"\n                        cy=\"14\"\n                        r=\"14\"\n                        fill=\"#306BFF\" />\n                <path d=\"M11.6875 9.8125V18.5625L18.5625 14.1875L11.6875 9.8125Z\"\n                      fill=\"white\" />\n            </svg>\n\n\n        </div>\n\n        <div *ngIf=\"!loaderDisplay && isPlaying\"\n             aria-hidden=\"true\"\n             class=\"pause-track\">\n            <svg width=\"28\"\n                 height=\"28\"\n                 viewBox=\"0 0 28 28\"\n                 fill=\"none\"\n                 xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"14\"\n                        cy=\"14\"\n                        r=\"14\"\n                        fill=\"#306BFF\" />\n                <path fill-rule=\"evenodd\"\n                      clip-rule=\"evenodd\"\n                      d=\"M12.4571 9.5H11.4286C10.8605 9.5 10.4 9.90294 10.4 10.4V17.6C10.4 18.0971 10.8605 18.5 11.4286 18.5H12.4571C13.0252 18.5 13.4857 18.0971 13.4857 17.6V10.4C13.4857 9.90294 13.0252 9.5 12.4571 9.5ZM16.5715 9.5H15.5429C14.9749 9.5 14.5144 9.90294 14.5144 10.4V17.6C14.5144 18.0971 14.9749 18.5 15.5429 18.5H16.5715C17.1395 18.5 17.6 18.0971 17.6 17.6V10.4C17.6 9.90294 17.1395 9.5 16.5715 9.5ZM11.4286 10.4V17.6H12.4571V10.4H11.4286ZM15.5427 17.6V10.4H16.5713V17.6H15.5427Z\"\n                      fill=\"white\" />\n            </svg>\n\n        </div>\n    </button>\n\n    <button (click)='startNextSong();'\n            [disabled]=\"loaderDisplay\"\n            class=\"p-1 skip-next ngx-basic-audio-player-button\">\n        <svg width=\"15\"\n             height=\"15\"\n             viewBox=\"0 0 15 15\"\n             fill=\"none\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M8.125 3.75L8.125 11.25L13.4375 7.5L8.125 3.75ZM7.8125 7.5L2.5 3.75L2.5 11.25L7.8125 7.5Z\"\n                  fill=\"#9098A9\" />\n        </svg>\n\n    </button>\n    <div class=\"flex-fill pl-1 ngx-basic-audio-player-slider\">\n        <mat-slider (change)=\"currTimePosChanged($event)\"\n                    [min]=\"startOffset\"\n                    max=\"{{duration-endOffset}}\"\n                    style=\"width: 100%\"\n                    value=\"{{currentTime}}\"></mat-slider>\n\n\n        <section *ngIf=\"displayTitle && title !== ''\"\n                 class=\"z-depth-1 song-title\">\n            <div style=\"text-align: center;\">\n                <div class=\"ngx-basic-audio-player-title\">\n                    {{ title }}\n                </div>\n            </div>\n        </section>\n\n        <div class=\"d-flex ngx-basic-audio-player-duration\">\n            <span *ngIf=\"duration !== 0.01\">\n                -{{duration-endOffset-currentTime |\n            secondsToMinutes }}\n            </span>\n        </div>\n\n    </div>\n\n    <section class=\"ngx-basic-audio-player-volume-slider\">\n        <mat-slider (change)=\"volumeChanged($event)\"\n                    min=\"0\"\n                    step=\"0.1\"\n                    max=\"1\"\n                    style=\"width: 50px\"\n                    [value]=\"volume\"></mat-slider>\n    </section>\n\n\n    <button (click)='toggleVolume();'\n            *ngIf=\"displayVolumeControls\"\n            class=\"ngx-basic-audio-player-button ml-1\">\n        <div aria-hidden=\"true\"\n             *ngIf=\"volume == 0\"\n             class=\"volume-mute\">\n\n            <svg width=\"16\"\n                 height=\"16\"\n                 viewBox=\"0 0 16 16\"\n                 fill=\"none\"\n                 xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M1.77777 5.62444V9.62444H4.44444L7.77777 12.9578V2.29111L4.44444 5.62444H1.77777Z\"\n                      fill=\"#9098A9\" />\n                <path d=\"M15 5.50357L14.4964 5L12.5 6.99643L10.5036 5L10 5.50357L11.9964 7.5L10 9.49643L10.5036 10L12.5 8.00357L14.4964 10L15 9.49643L13.0036 7.5L15 5.50357Z\"\n                      fill=\"#8E96A7\" />\n            </svg>\n\n\n        </div>\n        <div *ngIf=\"volume > 0\"\n             aria-hidden=\"true\"\n             class=\"volume-up\">\n            <svg width=\"16\"\n                 height=\"16\"\n                 viewBox=\"0 0 16 16\"\n                 fill=\"none\"\n                 xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M1.77777 5.62444V9.62444H4.44444L7.77777 12.9578V2.2911L4.44444 5.62444H1.77777ZM10.7778 7.62444C10.7778 6.44444 10.0978 5.4311 9.1111 4.93777V10.3044C10.0978 9.81777 10.7778 8.80444 10.7778 7.62444ZM9.1111 1.77777V3.1511C11.0378 3.72444 12.4444 5.5111 12.4444 7.62444C12.4444 9.73777 11.0378 11.5244 9.1111 12.0978V13.4711C11.7844 12.8644 13.7778 10.4778 13.7778 7.62444C13.7778 4.7711 11.7844 2.38444 9.1111 1.77777Z\"\n                      fill=\"#9098A9\" />\n            </svg>\n\n        </div>\n    </button>\n\n    <button *ngIf=\"closeBtn\"\n            (click)=\"startClosePlayer()\"\n            class=\"ngx-basic-audio-player-button ml-3\">\n        <svg width=\"19\"\n             height=\"19\"\n             viewBox=\"0 0 19 19\"\n             fill=\"none\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M15.0416 5.07459L13.9254 3.95834L9.49998 8.38376L5.07456 3.95834L3.95831 5.07459L8.38373 9.50001L3.95831 13.9254L5.07456 15.0417L9.49998 10.6163L13.9254 15.0417L15.0416 13.9254L10.6162 9.50001L15.0416 5.07459Z\"\n                  fill=\"#8E96A7\" />\n        </svg>\n\n    </button>\n</div>\n",
            styles: [".ngx-basic-audio-player{width:100%}.ngx-basic-audio-player-button{padding:0;border:0;background:0;cursor:pointer}.ngx-basic-audio-player-slider{position:relative}.song-title{position:absolute;top:0;right:0;width:100%;padding-left:11px;font-style:normal;font-weight:400;font-size:12px;line-height:14px;color:#565b6e;padding-right:50px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ngx-basic-audio-player-title{text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ngx-basic-audio-player-duration{position:absolute;top:0;right:0;font-style:normal;font-weight:400;font-size:11px;line-height:13px;color:#939aaa;padding-right:9px}.mat-slider-horizontal{min-width:initial}", "@import url(https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap-grid.min.css);mat-card,mat-slider{padding:0!important}button:focus,button:hover{outline:0!important}svg{vertical-align:top}mat-card{background:rgba(0,0,0,.02)}mat-icon>.currently-playing{height:16px!important;width:16px!important}"]
        }),
        __metadata("design:paramtypes", [])
    ], MatBasicAudioPlayerComponent);
    return MatBasicAudioPlayerComponent;
}(BaseAudioPlayerFunctions));

/*
 * Transform seconds to minutes:seconds
 * Example : 270 -> 02:30
*/
var SecondsToMinutesPipe = /** @class */ (function () {
    function SecondsToMinutesPipe() {
    }
    SecondsToMinutesPipe.prototype.transform = function (time) {
        var minutes = ('0' + Math.floor(time / 60)).slice(-2);
        var seconds = ('0' + time % 60).slice(-2);
        return minutes + ":" + seconds;
    };
    SecondsToMinutesPipe = __decorate([
        Pipe({ name: 'secondsToMinutes' })
    ], SecondsToMinutesPipe);
    return SecondsToMinutesPipe;
}());

var NgxAudioPlayerModule = /** @class */ (function () {
    function NgxAudioPlayerModule() {
    }
    NgxAudioPlayerModule = __decorate([
        NgModule({
            declarations: [MatBasicAudioPlayerComponent, SecondsToMinutesPipe, MatAdvancedAudioPlayerComponent],
            imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule,
                MatSliderModule, MatExpansionModule, MatPaginatorModule, MatIconModule],
            exports: [MatBasicAudioPlayerComponent, MatAdvancedAudioPlayerComponent]
        })
    ], NgxAudioPlayerModule);
    return NgxAudioPlayerModule;
}());

var Track = /** @class */ (function () {
    function Track() {
        var _this = this;
        this.toString = function () {
            return "Track (index: " + _this.index + ", title: " + _this.title + ")";
        };
    }
    return Track;
}());

/*
 * Public API Surface of ngx-audio-player
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatAdvancedAudioPlayerComponent, MatBasicAudioPlayerComponent, NgxAudioPlayerModule, Track, BaseAudioPlayerFunctions as ɵa, SecondsToMinutesPipe as ɵb };
//# sourceMappingURL=ngx-audio-player.js.map
