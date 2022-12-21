db.createUser({ user: 'admin', pwd: 'YtTTwaMa83', roles: [ { role: "root", db: "admin" } ] });

db.auth("admin", "YtTTwaMa83");

db.createUser({
    user: 'yapi',
    pwd: 'Tr36Km7FYwvmY',
    roles: [
        { role: "dbAdmin", db: "yapi" },
        { role: "readWrite", db: "yapi" }
    ]
});