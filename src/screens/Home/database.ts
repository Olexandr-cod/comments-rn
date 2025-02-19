import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

export const enableForeignKeys = async (db: SQLiteDatabase): Promise<void> => {
    try {
        await db.executeSql('PRAGMA foreign_keys = ON');
    } catch (error) {
        console.log('Error enabling foreign keys:', error);
    }
};

export const openDatabase = async () => {
    try {
        const db = await SQLite.openDatabase({ name: 'comments.db', location: 'default' });

        await enableForeignKeys(db);

        const [result] = await db.executeSql('PRAGMA table_info(comments)');
        const existingColumns = result.rows.raw().map(row => row.name);

        if (!existingColumns.includes('email') || !existingColumns.includes('userName')) {
            await db.executeSql(`
                CREATE TABLE IF NOT EXISTS comments_new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    text TEXT,
                    avatar TEXT,
                    email TEXT,
                    userName TEXT,
                    parentId INTEGER DEFAULT NULL,
                    isSynced INTEGER DEFAULT 0,
                    FOREIGN KEY (parentId) REFERENCES comments(id)
                );
            `);

            if (existingColumns.length > 0) {
                await db.executeSql(`
                    INSERT INTO comments_new (id, text, avatar, parentId)
                    SELECT id, text, avatar, parentId FROM comments;
                `);
                await db.executeSql('DROP TABLE comments;');
            }

            await db.executeSql('ALTER TABLE comments_new RENAME TO comments;');
        }

        return db;
    } catch (error) {
        console.log('Error opening database:', error);
    }
};

export const clearDatabase = async () => {
    // try {
    //     await SQLite.deleteDatabase({ name: 'comments.db', location: 'default' });
    //     console.log('Database deleted successfully');
    // } catch (error) {
    //     console.log('Error deleting database:', error);
    // }

    try {
        const db = await openDatabase();
        await db.executeSql('DELETE FROM comments');
        console.log('Database cleared successfully');
    } catch (error) {
        console.log('Error clearing database:', error);
    }
};
