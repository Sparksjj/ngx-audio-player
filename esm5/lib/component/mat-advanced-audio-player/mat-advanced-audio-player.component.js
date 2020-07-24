import { __decorate, __extends, __metadata } from "tslib";
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AudioPlayerService } from '../../service/audio-player-service/audio-player.service';
import { BaseAudioPlayerFunctions } from '../base/base-audio-player.component';
var MatAdvancedAudioPlayerComponent = /** @class */ (function (_super) {
    __extends(MatAdvancedAudioPlayerComponent, _super);
    function MatAdvancedAudioPlayerComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
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
        if (this.displayPlaylist === true &&
            ((this.currentIndex + 1) % this.paginator.pageSize === 0 ||
                this.currentIndex + 1 === this.paginator.length)) {
            if (this.paginator.hasNextPage()) {
                this.paginator.nextPage();
            }
            else if (!this.paginator.hasNextPage()) {
                this.paginator.firstPage();
            }
        }
        this.currentTime = 0;
        this.duration = 0.01;
        if (this.currentIndex + 1 >= this.tracks.length) {
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
            if (this.displayPlaylist === true &&
                (this.currentIndex % this.paginator.pageSize === 0 ||
                    this.currentIndex === 0)) {
                if (this.paginator.hasPreviousPage()) {
                    this.paginator.previousPage();
                }
                else if (!this.paginator.hasPreviousPage()) {
                    this.paginator.lastPage();
                }
            }
            if (this.currentIndex - 1 < 0) {
                this.currentIndex = this.tracks.length - 1;
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
        this.previousTrack =
            this.currentIndex - 1 >= 0
                ? this.tracks[this.currentIndex - 1]
                : this.tracks[this.tracks.length - 1];
        this.nextTrack =
            this.currentIndex + 1 >= this.tracks.length
                ? this.tracks[0]
                : this.tracks[this.currentIndex + 1];
        this.audioPlayerService.setCurrentTrack(this.currentTrack);
    };
    MatAdvancedAudioPlayerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], MatAdvancedAudioPlayerComponent);
    return MatAdvancedAudioPlayerComponent;
}(BaseAudioPlayerFunctions));
export { MatAdvancedAudioPlayerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWFkdmFuY2VkLWF1ZGlvLXBsYXllci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXVkaW8tcGxheWVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9tYXQtYWR2YW5jZWQtYXVkaW8tcGxheWVyL21hdC1hZHZhbmNlZC1hdWRpby1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDN0YsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFVL0U7SUFBcUQsbURBQXdCO0lBRzNFLHlDQUFzQixFQUFxQjtRQUEzQyxZQUNFLGtCQUFNLEVBQUUsQ0FBQyxTQUVWO1FBSHFCLFFBQUUsR0FBRixFQUFFLENBQW1CO1FBaUIzQyxzQkFBZ0IsR0FBYSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxnQkFBVSxHQUFHLElBQUksa0JBQWtCLEVBQVMsQ0FBQztRQUs3QyxZQUFNLEdBQVksRUFBRSxDQUFDO1FBRVosa0JBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIscUJBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsMkJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLHFCQUFlLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLGNBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUVsQixrQkFBWSxHQUFHLENBQUMs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LENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTO1lBQ1osSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUN6QyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Z0JBakt5QixpQkFBaUI7O0lBTTNDO1FBREMsS0FBSyxFQUFFOzs7bUVBR1A7SUFFMkM7UUFBM0MsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztrQ0FDckMsWUFBWTt5Q0FBWixZQUFZO3VFQUlqQjtJQVVRO1FBQVIsS0FBSyxFQUFFOzt5RUFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7OzRFQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTs7a0ZBQThCO0lBQzdCO1FBQVIsS0FBSyxFQUFFOzs0RUFBZ0M7SUFDL0I7UUFBUixLQUFLLEVBQUU7O3FFQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTs7cUVBQWtCO0lBakNmLCtCQUErQjtRQVIzQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLCsxZkFBeUQ7O1NBSzFELENBQUM7eUNBSTBCLGlCQUFpQjtPQUhoQywrQkFBK0IsQ0FxSzNDO0lBQUQsc0NBQUM7Q0FBQSxBQXJLRCxDQUFxRCx3QkFBd0IsR0FxSzVFO1NBcktZLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHsgTWF0U2xpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IFRyYWNrIH0gZnJvbSAnLi4vLi4vbW9kZWwvdHJhY2subW9kZWwnO1xuaW1wb3J0IHsgQXVkaW9QbGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZS9hdWRpby1wbGF5ZXItc2VydmljZS9hdWRpby1wbGF5ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlQXVkaW9QbGF5ZXJGdW5jdGlvbnMgfSBmcm9tICcuLi9iYXNlL2Jhc2UtYXVkaW8tcGxheWVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1hZHZhbmNlZC1hdWRpby1wbGF5ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LWFkdmFuY2VkLWF1ZGlvLXBsYXllci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICcuL21hdC1hZHZhbmNlZC1hdWRpby1wbGF5ZXIuY29tcG9uZW50LmNzcycsXG4gICAgJy4vLi4vYmFzZS9iYXNlLWF1ZGlvLXBsYXllci5jb21wb25lbnQuY3NzJyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0QWR2YW5jZWRBdWRpb1BsYXllckNvbXBvbmVudCBleHRlbmRzIEJhc2VBdWRpb1BsYXllckZ1bmN0aW9uc1xuICBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGF1ZGlvUGxheWVyU2VydmljZTogQXVkaW9QbGF5ZXJTZXJ2aWNlO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoY2QpO1xuICAgIHRoaXMuYXVkaW9QbGF5ZXJTZXJ2aWNlID0gbmV3IEF1ZGlvUGxheWVyU2VydmljZSgpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHBsYXlsaXN0KHBsYXlsaXN0OiBUcmFja1tdKSB7XG4gICAgdGhpcy5hdWRpb1BsYXllclNlcnZpY2Uuc2V0UGxheWxpc3QocGxheWxpc3QpO1xuICB9XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IsIHsgc3RhdGljOiBmYWxzZSB9KSBzZXQgbWF0UGFnaW5hdG9yKFxuICAgIG1wOiBNYXRQYWdpbmF0b3JcbiAgKSB7XG4gICAgdGhpcy5wYWdpbmF0b3IgPSBtcDtcbiAgICB0aGlzLnNldERhdGFTb3VyY2VBdHRyaWJ1dGVzKCk7XG4gIH1cblxuICBkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSA9IFsndGl0bGUnLCAnc3RhdHVzJ107XG4gIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPFRyYWNrPigpO1xuICBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcblxuICB0aW1lTGluZUR1cmF0aW9uOiBNYXRTbGlkZXI7XG5cbiAgdHJhY2tzOiBUcmFja1tdID0gW107XG5cbiAgQElucHV0KCkgZGlzcGxheVRpdGxlID0gdHJ1ZTtcbiAgQElucHV0KCkgZGlzcGxheVBsYXlsaXN0ID0gdHJ1ZTtcbiAgQElucHV0KCkgZGlzcGxheVZvbHVtZUNvbnRyb2xzID0gdHJ1ZTtcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zID0gWzEwLCAyMCwgMzBdO1xuICBASW5wdXQoKSBleHBhbmRlZCA9IHRydWU7XG4gIEBJbnB1dCgpIGF1dG9QbGF5ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBjdXJyZW50SW5kZXggPSAwO1xuXG4gIGN1cnJlbnRUcmFjazogVHJhY2s7XG4gIHByaXZhdGUgcHJldmlvdXNUcmFjazogVHJhY2s7XG4gIHByaXZhdGUgbmV4dFRyYWNrOiBUcmFjaztcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmJpbmRQbGF5ZXJFdmVudCgpO1xuXG4gICAgLy8gU3Vic2NyaWJlIHRvIHBsYXlsaXN0IG9ic2VydmVyIGZyb20gQXVkaW9QbGF5ZXJTZXJ2aWNlIGFuZFxuICAgIC8vIHVwZGF0ZSB0aGUgcGxheWxpc3Qgd2l0aGluIE1hdEFkdmFuY2VkQXVkaW9QbGF5ZXJDb21wb25lbnRcbiAgICB0aGlzLmF1ZGlvUGxheWVyU2VydmljZS5nZXRQbGF5bGlzdCgpLnN1YnNjcmliZSgodHJhY2tzKSA9PiB7XG4gICAgICBpZiAodHJhY2tzICE9PSBudWxsICYmIHRyYWNrcyAhPT0gW10pIHtcbiAgICAgICAgdGhpcy50cmFja3MgPSB0cmFja3M7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICAvLyBwb3B1bGF0ZSBpbmRleHMgZm9yIHRoZSB0cmFjayBhbmQgY29uZmlndXJlXG4gICAgLy8gbWF0ZXJpYWwgdGFibGUgZGF0YSBzb3VyY2UgYW5kIHBhZ2luYXRvclxuICAgIHRoaXMuc2V0RGF0YVNvdXJjZUF0dHJpYnV0ZXMoKTtcblxuICAgIC8vIGF1dG8gcGxheSBuZXh0IHRyYWNrXG4gICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHtcbiAgICAgIHRoaXMubmV4dFNvbmcoKTtcbiAgICB9KTtcblxuICAgIHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsICgpID0+IHtcbiAgICAgIHRoaXMuYXVkaW9QbGF5ZXJTZXJ2aWNlLnNldEN1cnJlbnRUaW1lKFxuICAgICAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IHRoaXMuc3RhcnRPZmZzZXQ7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50U29uZygpO1xuICAgIGlmICh0aGlzLmF1dG9QbGF5KSB7XG4gICAgICBzdXBlci5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RGF0YVNvdXJjZUF0dHJpYnV0ZXMoKSB7XG4gICAgbGV0IGluZGV4ID0gMTtcbiAgICBpZiAodGhpcy50cmFja3MpIHtcbiAgICAgIHRoaXMudHJhY2tzLmZvckVhY2goKHRyYWNrOiBUcmFjaykgPT4ge1xuICAgICAgICB0cmFjay5pbmRleCA9IGluZGV4Kys7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8VHJhY2s+KHRoaXMudHJhY2tzKTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICB9XG4gIH1cblxuICBuZXh0U29uZygpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmRpc3BsYXlQbGF5bGlzdCA9PT0gdHJ1ZSAmJlxuICAgICAgKCh0aGlzLmN1cnJlbnRJbmRleCArIDEpICUgdGhpcy5wYWdpbmF0b3IucGFnZVNpemUgPT09IDAgfHxcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggKyAxID09PSB0aGlzLnBhZ2luYXRvci5sZW5ndGgpXG4gICAgKSB7XG4gICAgICBpZiAodGhpcy5wYWdpbmF0b3IuaGFzTmV4dFBhZ2UoKSkge1xuICAgICAgICB0aGlzLnBhZ2luYXRvci5uZXh0UGFnZSgpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5wYWdpbmF0b3IuaGFzTmV4dFBhZ2UoKSkge1xuICAgICAgICB0aGlzLnBhZ2luYXRvci5maXJzdFBhZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDAuMDE7XG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ICsgMSA+PSB0aGlzLnRyYWNrcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcbiAgICB9XG4gICAgdGhpcy51cGRhdGVDdXJyZW50U29uZygpO1xuICAgIHRoaXMucGxheSh0aGlzLm5leHRUcmFjayk7XG4gIH1cblxuICBwcmV2aW91c1NvbmcoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDAuMDE7XG4gICAgaWYgKCF0aGlzLmNoZWNrSWZTb25nSGFzU3RhcnRlZFNpbmNlQXRsZWFzdFR3b1NlY29uZHMoKSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmRpc3BsYXlQbGF5bGlzdCA9PT0gdHJ1ZSAmJlxuICAgICAgICAodGhpcy5jdXJyZW50SW5kZXggJSB0aGlzLnBhZ2luYXRvci5wYWdlU2l6ZSA9PT0gMCB8fFxuICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID09PSAwKVxuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLnBhZ2luYXRvci5oYXNQcmV2aW91c1BhZ2UoKSkge1xuICAgICAgICAgIHRoaXMucGFnaW5hdG9yLnByZXZpb3VzUGFnZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnBhZ2luYXRvci5oYXNQcmV2aW91c1BhZ2UoKSkge1xuICAgICAgICAgIHRoaXMucGFnaW5hdG9yLmxhc3RQYWdlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCAtIDEgPCAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy50cmFja3MubGVuZ3RoIC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4LS07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzZXRTb25nKCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlQ3VycmVudFNvbmcoKTtcbiAgICB0aGlzLnBsYXkodGhpcy5wcmV2aW91c1RyYWNrKTtcbiAgfVxuXG4gIHJlc2V0U29uZygpOiB2b2lkIHtcbiAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuY3VycmVudFRyYWNrLmxpbms7XG4gIH1cblxuICBzZWxlY3RUcmFjayhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSBpbmRleCAtIDE7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50U29uZygpO1xuICAgIHRoaXMucGxheSh0aGlzLmN1cnJlbnRUcmFjayk7XG4gIH1cblxuICBjaGVja0lmU29uZ0hhc1N0YXJ0ZWRTaW5jZUF0bGVhc3RUd29TZWNvbmRzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID4gMjtcbiAgfVxuXG4gIHVwZGF0ZUN1cnJlbnRTb25nKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFRyYWNrID0gdGhpcy50cmFja3NbdGhpcy5jdXJyZW50SW5kZXhdO1xuICAgIHRoaXMucHJldmlvdXNUcmFjayA9XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCAtIDEgPj0gMFxuICAgICAgICA/IHRoaXMudHJhY2tzW3RoaXMuY3VycmVudEluZGV4IC0gMV1cbiAgICAgICAgOiB0aGlzLnRyYWNrc1t0aGlzLnRyYWNrcy5sZW5ndGggLSAxXTtcbiAgICB0aGlzLm5leHRUcmFjayA9XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCArIDEgPj0gdGhpcy50cmFja3MubGVuZ3RoXG4gICAgICAgID8gdGhpcy50cmFja3NbMF1cbiAgICAgICAgOiB0aGlzLnRyYWNrc1t0aGlzLmN1cnJlbnRJbmRleCArIDFdO1xuXG4gICAgdGhpcy5hdWRpb1BsYXllclNlcnZpY2Uuc2V0Q3VycmVudFRyYWNrKHRoaXMuY3VycmVudFRyYWNrKTtcbiAgfVxufVxuIl19