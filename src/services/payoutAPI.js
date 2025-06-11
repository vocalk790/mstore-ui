export const submitPayoutRequest = async (userEmail, amount = 10000) => {
  try {
    const response = await fetch('https://your-api-server.com/api/payout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        amount,
      }),
    });

    if (!response.ok) throw new Error('서버 오류');

    return true;
  } catch (error) {
    console.error('❌ 출금 신청 오류:', error);
    return false;
  }
};
