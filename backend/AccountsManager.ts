import bcrypt from 'bcrypt';
import { Account } from './models/Account';
import mongoose from 'mongoose';
import { error } from 'console';


// interface for user creation parameters
interface AccountData {
    username: string;
    password: string;
    fullName: string;
    type: string;
    //cartItems?: mongoose.Types.ObjectId[];
    //orders?: mongoose.Types.ObjectId[];
    //mails?: mongoose.Types.ObjectId[];
    //attendingEvents?: mongoose.Types.ObjectId[];
    //hostedEvents?: mongoose.Types.ObjectId[];
}

// account types: regular and admin (can add as necessary ex: guest users, tiered users)
class RegularAccount {
    account: InstanceType<typeof Account>;
    constructor(data: AccountData) {
        this.account = new Account({ ...data, type: 'Regular' });
    }
}

class AdminAccount {
    account: InstanceType<typeof Account>;
    constructor(data: AccountData) {
        this.account = new Account({ ...data, type: 'Admin' });
    }
}

class OrganizerAccount {
    account: InstanceType<typeof Account>;
    constructor(data: AccountData) {
        this.account = new Account({ ...data, type: 'Organizer' });
    }
}

// factory class (factory design pattern)
class AccountFactory {
    static createAccount(type: string, data: AccountData): any {
        switch (type) {
            case 'Admin':
                return new AdminAccount(data).account;
            case 'Regular':
                return new RegularAccount(data).account;
            case 'Organizer':
                return new OrganizerAccount(data).account;
            default:
                throw new Error("Error initializing the type.");
        }
    }   
}

class AccountsManager {
    // find account by username
    static async findAccountByUsername(username: String) {
        return await Account.findOne({ username });
    }

    static async register(username: string, password: string, type: string, fullName: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hash: ', hashedPassword);
        const newAccount = AccountFactory.createAccount(type, {username, password: hashedPassword, type, fullName});
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