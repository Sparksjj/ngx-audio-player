import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
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
export { SecondsToMinutesPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vjb25kcy10by1taW51dGVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF1ZGlvLXBsYXllci8iLCJzb3VyY2VzIjpbImxpYi9waXBlL3NlY29uZHMtdG8tbWludXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQ7OztFQUdFO0FBRUY7SUFBQTtJQU1BLENBQUM7SUFMRyx3Q0FBUyxHQUFULFVBQVUsSUFBWTtRQUNsQixJQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxPQUFVLE9BQU8sU0FBSSxPQUFTLENBQUM7SUFDbkMsQ0FBQztJQUxRLG9CQUFvQjtRQURoQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztPQUN0QixvQkFBb0IsQ0FNaEM7SUFBRCwyQkFBQztDQUFBLEFBTkQsSUFNQztTQU5ZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qXG4gKiBUcmFuc2Zvcm0gc2Vjb25kcyB0byBtaW51dGVzOnNlY29uZHNcbiAqIEV4YW1wbGUgOiAyNzAgLT4gMDI6MzBcbiovXG5AUGlwZSh7IG5hbWU6ICdzZWNvbmRzVG9NaW51dGVzJyB9KVxuZXhwb3J0IGNsYXNzIFNlY29uZHNUb01pbnV0ZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHRpbWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSAoJzAnICsgTWF0aC5mbG9vcih0aW1lIC8gNjApKS5zbGljZSgtMik7XG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSAoJzAnICsgdGltZSAlIDYwKS5zbGljZSgtMik7XG4gICAgICAgIHJldHVybiBgJHttaW51dGVzfToke3NlY29uZHN9YDtcbiAgICB9XG59XG4iXX0=