class LoginStreak {

    /**
     * Updates the login streak of an account
     *  1. If the `lastLogin` was more than 36 hours ago, reset the streak
     *  2. Else, If the `loginStreakLastDate` was more than 12 hours ago, increment the streak
     *  3. Else, ignore the login (to prevent spamming)
     * @param account 
     */
    static async updateLoginStreak(account: any) {

        const lastLogin = new Date(account.lastLogin);
        const now = new Date();
        const oneHour = 60 * 60 * 1000;

        if (now.getTime() - lastLogin.getTime() > 36 * oneHour) {
            account.loginStreak = 1;
            account.loginStreakLastDate = now;
            account.loginStreakStartDate = now;
        } else if (now.getTime() - account.loginStreakLastDate.getTime() > 12 * oneHour) {
            account.loginStreak++;
            account.loginStreakRecord = Math.max(account.loginStreakRecord, account.loginStreak);
            account.loginStreakLastDate = now;
        }

        account.lastLogin = now;
        await account.save();
    }
}

export default LoginStreak;