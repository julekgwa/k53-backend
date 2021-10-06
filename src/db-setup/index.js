const { pool } = require('../client/dbConnection');

async function importTables() {
  const connection = await pool.getConnection();
  await connection.execute('CREATE TABLE IF NOT EXISTS `answers` (`id` int NOT NULL,`answer` mediumtext NOT NULL,`questionId` int NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;');
  await connection.execute("CREATE TABLE IF NOT EXISTS `questions` (`id` int NOT NULL,`title` mediumtext NOT NULL,`correct` int NOT NULL,`answer` int DEFAULT '-1', `hasImage` tinyint(1) DEFAULT '0', `imageUrl` varchar(2083) DEFAULT '',`category` varchar(255) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;");
  await connection.execute("ALTER TABLE `answers` ADD PRIMARY KEY (`id`);");
  await connection.execute("ALTER TABLE `questions` ADD PRIMARY KEY (`id`);");
  await connection.execute("COMMIT;");

  // inset
  await connection.execute("INSERT INTO `questions` (`id`, `title`, `correct`, `answer`, `hasImage`, `imageUrl`, `category`) VALUES(1, 'The most important RULE OF THE ROAD in South Africa is?', 2, -1, 0, '', NULL),(2, 'A light/heavy vehicle should not carry a load that projects...', 1, -1, 0, '', NULL);")
  await connection.execute("INSERT INTO `answers` (`id`, `answer`, `questionId`) VALUES(1, 'More than 10 metres to the front of the vehicle.', 2),(2, 'More than 1.8 metres to the back of the vehicle.', 2),(3, 'Less than 1.8 millimetres to the left.', 2),(4, 'Always be courteous and considerate towards fellow road users.', 1),(5, 'Do not exceed the speed limit.', 1),(6, 'Keep to the left side of the road far as is safe.', 1);")
}

module.exports = {
  importTables
}
