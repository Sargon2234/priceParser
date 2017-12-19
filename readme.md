API parser and DB saver.
===
**Description:** <br>
* Service checks API every hour and updates prices in db;
* Provide API to get all available prices or price for requested item.

**Used technologies:**
* Node.js,
* MySQL,
* Express.

**Packages:**
* express,
* node-fetch,
* node-cron,
* pm2,
* mysql.

### Project setup
* git clone <project>
* cd <project>
* npm i
* set `config.js` file
* Create mysql table : <br>
`CREATE TABLE items (
                          id int(11) unsigned NOT NULL AUTO_INCREMENT,
                          name varchar(255) DEFAULT NULL,
                          safe_price int(11) DEFAULT NULL,
                          safe_net_price int(11) DEFAULT NULL,
                          PRIMARY KEY (id),
                          UNIQUE KEY name (name)
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
* Start project: `npm run start`

### API
* Request for all data: 
    * **Method** `GET` _url_: `/api/all`

* Request for item data:
     * **Method** `GET` _url_: `/api/:itemName[string]`
     
**Response**:
* _Success_: `{ status: 'ok', result[Array] }`;
* _Error_ (soft): `{ status: 'ok', message: 'No entries found.' }`;
* _Error_ (hard): `{ status: 'error' }`
