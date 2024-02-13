import handleNotificationReceived from "utils/handleNotificationReceived";

const msg = {
  data: {
    type: "wod",
    entryId: "가다0",
  },
  fcmOptions: {},
};

const navigate = jest.fn();

describe("handleNotificationReceived function", () => {
  it("opens the Display Page with the Word of the Day", async () => {
    handleNotificationReceived(msg, { navigate } as any);

    expect(navigate).toHaveBeenCalledWith("Display", {
      entryId: msg.data.entryId,
    });
  });
});
