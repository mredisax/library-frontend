export const getCanBookBeReserved = async (
  bookId: number,
  startDate: Date
): Promise<{ canBeReserved: boolean; reservationDueDate: Date }> => {
  let date = new Date();
  date.setMonth(date.getMonth() + 1);

  if (bookId % 2 === 0) { // TODO: this is only mockup. Remove it later.
    return {
      canBeReserved: false,
      reservationDueDate: date,
    };
  } else {
    return {
      canBeReserved: true,
      reservationDueDate: date,
    };
  }
};