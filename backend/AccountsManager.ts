import bcrypt from 'bcrypt';
import { Account, IAccount } from './models/Account';
import mongoose, { Model } from 'mongoose';
import { error } from 'console';

enum AccountRole {
    Regular = 'Regular',
    Admin = 'Admin',
    Organizer = 'Organizer'
}

// interface for user creation parameters
interface AccountData {
    email: string;
    password: string;
    fullName: string;
    role: AccountRole;
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
    static createAccount(role: AccountRole, data: AccountData): InstanceType<typeof Account> {
        switch (role) {
            case AccountRole.Admin:
                return new AdminAccount(data).account;
            case AccountRole.Regular:
                return new RegularAccount(data).account;
            case AccountRole.Organizer:
                return new OrganizerAccount(data).account;
            default:
                throw new Error("Error initializing the type.");
        }
    }   
}

class AccountsManager {
    // find account by email
    static async findAccountByEmail(email: String) {
        return await Account.findOne({ email });
    }

    static async register(email: string, password: string, role: AccountRole, fullName: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hash: ', hashedPassword);
        const newAccount = AccountFactory.createAccount(role, {email, password: hashedPassword, role, fullName});
        const result = await newAccount.save();
        console.log('User created!');
        return result;
    }

    static async login(email: string, password: string) {
        const account = await AccountsManager.findAccountByEmail(email);
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

export {AccountRole, AccountsManager};