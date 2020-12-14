import { formatTime } from "../SoundList";

describe("format time", () => {
  it("should format time", () => {
    expect(formatTime(40271)).toEqual("11:11:11");
    expect(formatTime(36000)).toEqual("10:00:00");
    expect(formatTime(35999)).toEqual("09:59:59");
    expect(formatTime(3661)).toEqual("01:01:01");
    expect(formatTime(3661)).toEqual("01:01:01");
    expect(formatTime(3601)).toEqual("01:00:01");
    expect(formatTime(3600)).toEqual("01:00:00");
    expect(formatTime(3599)).toEqual("00:59:59");
    expect(formatTime(601)).toEqual("00:10:01");
    expect(formatTime(600)).toEqual("00:10:00");
    expect(formatTime(599)).toEqual("00:09:59");
    expect(formatTime(61)).toEqual("00:01:01");
    expect(formatTime(60)).toEqual("00:01:00");
    expect(formatTime(59)).toEqual("00:00:59");
    expect(formatTime(0)).toEqual("00:00:00");
  });
});
