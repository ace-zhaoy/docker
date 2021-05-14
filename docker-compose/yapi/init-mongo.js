db.createUser({ user: 'admin', pwd: 'zhaoyang', roles: [ { role: "root", db: "admin" } ] });

db.auth("admin", "zhaoyang");

db.createUser({
    user: 'yapi',
    pwd: 'avid123',
    roles: [
        { role: "dbAdmin", db: "yapi" },
        { role: "readWrite", db: "yapi" }
    ]
});