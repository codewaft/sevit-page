import $ from "jquery";
import { DateTime as dt } from "luxon";

const wait = (time) => new Promise((r) => setTimeout(() => r(), time));

function runPreview() {
  async function runStatus($this) {
    await wait(2000);
    const status = $($this.find("#status")[0]);
    const runner = Array(256).fill(0);
    let curr = 1;
    for (const run of runner) {
      await wait(20);
      status
        .text(`processing (${curr}/256)`)
        .removeClass("scheduled")
        .addClass("processing");
      curr++;
    }
    await wait(500);
    status
      .text(`completed (256/256)`)
      .removeClass("processing")
      .addClass("completed");
  }
  async function runTimestamps($this) {
    const createdAt = $($this.find(".created-at")[0]);
    const updatedAt = $($this.find(".updated-at")[0]);
    const scheduledAt = $($this.find(".scheduled-at")[0]);
    const datetime = (delayed = 0) =>
      dt
        .now()
        .minus({ minute: delayed })
        .setLocale("en")
        .toLocaleString(dt.DATETIME_MED);
    createdAt.text(datetime(2));
    updatedAt.text(datetime(2));
    scheduledAt.text(datetime());
  }
  $("#message-preview", ($this) => {
    runStatus($this);
    runTimestamps($this);
  });
}

$(() => {
  runPreview();
});
