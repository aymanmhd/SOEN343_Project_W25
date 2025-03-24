import bcrypt from 'bcrypt';
import { Account } from './models/Account';

class AccountsManager {
    // find account by username
    static async findAccountByUsername(username: String) {
        return await Account.findOne({ username });
    }

    static async register(username: string, password: string, isAdmin: boolean, fullName: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hash:', hashedPassword);
        const newAccount = new Account({ username, password: hashedPassword, isAdmin, fullName });
        const result = await newAccount.save();
        console.log('User created!');
        return result;
    }

    static async login(username: string, password: string) {
        const account = await AccountsManager.findAccountByUsername(username);
        if (!account) {
            throw new Error('Account not found');
        }

        const isPasswordValid = await bcrypt.compare(password, account.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return account;
    }
}

export default AccountsManager;