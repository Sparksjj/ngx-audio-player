import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
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
    AudioPlayerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AudioPlayerService_Factory() { return new AudioPlayerService(); }, token: AudioPlayerService, providedIn: "root" });
    AudioPlayerService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], AudioPlayerService);
    return AudioPlayerService;
}());
export { AudioPlayerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8tcGxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYXVkaW8tcGxheWVyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2UvYXVkaW8tcGxheWVyLXNlcnZpY2UvYXVkaW8tcGxheWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7QUFNbkQ7SUFBQTtRQUVFLDZCQUE2QjtRQUM3QixXQUFNLEdBQVksRUFBRSxDQUFDO1FBQ3JCLHFCQUFnQixHQUNkLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUk1Qyx5QkFBb0IsR0FDbEIsSUFBSSxlQUFlLENBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBSWhELHdCQUFtQixHQUNqQixJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0E2QjlDO0lBM0JDLHdDQUFXLEdBQVgsVUFBWSxNQUFlO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELDRDQUFlLEdBQWYsVUFBZ0IsWUFBbUI7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELDRDQUFlLEdBQWY7UUFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMkNBQWMsR0FBZCxVQUFlLFdBQWdCO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCwyQ0FBYyxHQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDakQsQ0FBQzs7SUExQ1Usa0JBQWtCO1FBSDlCLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxrQkFBa0IsQ0E0QzlCOzZCQW5ERDtDQW1EQyxBQTVDRCxJQTRDQztTQTVDWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRyYWNrIH0gZnJvbSAnLi4vLi4vbW9kZWwvdHJhY2subW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXVkaW9QbGF5ZXJTZXJ2aWNlIHtcblxuICAvLyBEeW5hbWljIHVwZGF0ZSBvZiBwbGF5bGlzdFxuICB0cmFja3M6IFRyYWNrW10gPSBbXTtcbiAgcGxheWxpc3RTdWJqZWN0JDogQmVoYXZpb3JTdWJqZWN0PFRyYWNrW10+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PFRyYWNrW10+KHRoaXMudHJhY2tzKTtcblxuICAvLyBHZXQgdGhlIGN1cnJlbnQgdHJhY2tcbiAgY3VycmVudFRyYWNrOiBUcmFjaztcbiAgY3VycmVudFRyYWNrU3ViamVjdCQ6IEJlaGF2aW9yU3ViamVjdDxUcmFjaz4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8VHJhY2s+KHRoaXMuY3VycmVudFRyYWNrKTtcblxuICAvLyBHZXQgdGhlIGN1cnJlbnQgdGltZVxuICBjdXJyZW50VGltZTogYW55O1xuICBjdXJyZW50VGltZVN1YmplY3QkOiBCZWhhdmlvclN1YmplY3Q8YW55PiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHRoaXMuY3VycmVudFRpbWUpO1xuXG4gIHNldFBsYXlsaXN0KHRyYWNrczogVHJhY2tbXSkge1xuICAgIHRoaXMudHJhY2tzID0gdHJhY2tzO1xuICAgIHRoaXMucGxheWxpc3RTdWJqZWN0JC5uZXh0KHRoaXMudHJhY2tzKTtcbiAgfVxuXG4gIGdldFBsYXlsaXN0KCk6IE9ic2VydmFibGU8VHJhY2tbXT4ge1xuICAgIHJldHVybiB0aGlzLnBsYXlsaXN0U3ViamVjdCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXRDdXJyZW50VHJhY2soY3VycmVudFRyYWNrOiBUcmFjaykge1xuICAgIHRoaXMuY3VycmVudFRyYWNrID0gY3VycmVudFRyYWNrO1xuICAgIHRoaXMuY3VycmVudFRyYWNrU3ViamVjdCQubmV4dCh0aGlzLmN1cnJlbnRUcmFjayk7XG4gIH1cblxuICBnZXRDdXJyZW50VHJhY2soKTogT2JzZXJ2YWJsZTxUcmFjaz4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRUcmFja1N1YmplY3QkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgc2V0Q3VycmVudFRpbWUoY3VycmVudFRpbWU6IGFueSkge1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICB0aGlzLmN1cnJlbnRUaW1lU3ViamVjdCQubmV4dCh0aGlzLmN1cnJlbnRUaW1lKTtcbiAgfVxuXG4gIGdldEN1cnJlbnRUaW1lKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFRpbWVTdWJqZWN0JC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG59XG4iXX0=