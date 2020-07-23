import { __decorate, __metadata } from "tslib";
import { ElementRef, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
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
export { BaseAudioPlayerFunctions };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1hdWRpby1wbGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF1ZGlvLXBsYXllci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvYmFzZS9iYXNlLWF1ZGlvLXBsYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQjtJQUFBO1FBRUUsZUFBVSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBS3BELFFBQUcsR0FDRCxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzFDLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxVQUFVLElBQUksU0FBUyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0RSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFFbkIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2IsYUFBUSxHQUFHLElBQUksQ0FBQztRQUVSLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQVd0QixjQUFTLEdBQUcsQ0FBQyxDQUFDO0lBOEV2QixDQUFDO0lBdkZDLHNCQUFJLGlEQUFXO2FBSWY7WUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQixDQUFDO2FBTkQsVUFBZ0IsT0FBZTtZQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7SUFR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Q2E7SUE4RXZCLCtCQUFDO0NBQUEsQUEzR0QsSUEyR0M7U0EzR1ksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbGlkZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVHJhY2sgfSBmcm9tICcuLi8uLi9tb2RlbC90cmFjay5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBCYXNlQXVkaW9QbGF5ZXJGdW5jdGlvbnMge1xuICBAT3V0cHV0KClcbiAgdHJhY2tFbmRlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2F1ZGlvUGxheWVyJywgeyBzdGF0aWM6IHRydWUgfSkgcGxheWVyOiBFbGVtZW50UmVmO1xuICB0aW1lTGluZUR1cmF0aW9uOiBNYXRTbGlkZXI7XG5cbiAgaU9TID1cbiAgICAoL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSB8fFxuICAgICAgKG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKSkgJiZcbiAgICAhd2luZG93Lk1TU3RyZWFtO1xuXG4gIGxvYWRlckRpc3BsYXkgPSBmYWxzZTtcbiAgaXNQbGF5aW5nID0gZmFsc2U7XG4gIGN1cnJlbnRUaW1lID0gMDtcbiAgdm9sdW1lID0gMC4xO1xuICBkdXJhdGlvbiA9IDAuMDE7XG5cbiAgcHJpdmF0ZSBzdGFydE9mZnNldFZhbHVlID0gMDtcbiAgQElucHV0KClcbiAgc2V0IHN0YXJ0T2Zmc2V0KHNlY29uZHM6IG51bWJlcikge1xuICAgIHRoaXMuc3RhcnRPZmZzZXRWYWx1ZSA9IHNlY29uZHM7XG4gICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IHNlY29uZHM7XG4gIH1cbiAgZ2V0IHN0YXJ0T2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRPZmZzZXRWYWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBlbmRPZmZzZXQgPSAwO1xuXG4gIGN1cnJUaW1lUG9zQ2hhbmdlZChldmVudCkge1xuICAgIHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSBldmVudC52YWx1ZTtcbiAgfVxuXG4gIGJpbmRQbGF5ZXJFdmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCAoKSA9PiB7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgICB0aGlzLmR1cmF0aW9uID0gTWF0aC5mbG9vcih0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmR1cmF0aW9uKTtcbiAgICB9KTtcbiAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgKCkgPT4ge1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRUaW1lID0gTWF0aC5mbG9vcih0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lKTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUaW1lID49IHRoaXMuZHVyYXRpb24gLSB0aGlzLmVuZE9mZnNldCkge1xuICAgICAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LnBhdXNlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd2b2x1bWUnLCAoKSA9PiB7XG4gICAgICB0aGlzLnZvbHVtZSA9IE1hdGguZmxvb3IodGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC52b2x1bWUpO1xuICAgIH0pO1xuICAgIGlmICghdGhpcy5pT1MpIHtcbiAgICAgIHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRlckRpc3BsYXkgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsICgpID0+IHtcbiAgICAgIHRoaXMubG9hZGVyRGlzcGxheSA9IGZhbHNlO1xuICAgICAgdGhpcy5kdXJhdGlvbiA9IE1hdGguZmxvb3IodGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5kdXJhdGlvbik7XG4gICAgfSk7XG4gICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHtcbiAgICAgIHRoaXMudHJhY2tFbmRlZC5uZXh0KCdlbmRlZCcpO1xuICAgIH0pO1xuICB9XG5cbiAgcGxheUJ0bkhhbmRsZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9hZGVyRGlzcGxheSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5wYXVzZWQpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUaW1lID49IHRoaXMuZHVyYXRpb24gLSB0aGlzLmVuZE9mZnNldCkge1xuICAgICAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gdGhpcy5zdGFydE9mZnNldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LnBsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50VGltZSA9IHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWU7XG4gICAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgcGxheSh0cmFjaz86IFRyYWNrKTogdm9pZCB7XG4gICAgaWYgKHRyYWNrKSB7XG4gICAgICB0aGlzLnN0YXJ0T2Zmc2V0ID0gdHJhY2suc3RhcnRPZmZzZXQgfHwgMDtcbiAgICAgIHRoaXMuZW5kT2Zmc2V0ID0gdHJhY2suZW5kT2Zmc2V0IHx8IDA7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LnBsYXkoKTtcbiAgICB9LCA1MCk7XG4gIH1cblxuICB0b2dnbGVWb2x1bWUoKSB7XG4gICAgaWYgKHRoaXMudm9sdW1lID09PSAwKSB7XG4gICAgICB0aGlzLnNldFZvbHVtZSgxLjApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFZvbHVtZSgwKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0Vm9sdW1lKHZvbCkge1xuICAgIHRoaXMudm9sdW1lID0gdm9sO1xuICAgIHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdGhpcy52b2x1bWU7XG4gIH1cbn1cbiJdfQ==