DROP DATABASE IF EXISTS talk_app;
CREATE DATABASE talk_app;
USE talk_app;


CREATE TABLE todos(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reg_date DATETIME NOT NULL,
    autor VARCHAR(50) NOT NULL,
    content VARCHAR(100) NOT NULL,
    hit INT UNSIGNED NOT NULL,
    like_count INT UNSIGNED NOT NULL,
    dislike_count INT UNSIGNED NOT NULL    
);


INSERT INTO todos SET
reg_date = NOW(),
autor = "바뤼흐 스피노자",
content = "눈물 흘리지 마라, 화내지 마라. 이해하라.";

INSERT INTO todos SET
reg_date = NOW(),
autor = "공자",
content = "허물이 있다면, 버리기를 두려워 말라";

INSERT INTO todos SET
reg_date = NOW(),
autor = "조제프 드 메스트르",
content = "모든 국가는 그에 걸맞은 정부를 가진다.";

INSERT INTO todos SET
reg_date = NOW(),
autor = "루이 파스퇴르",
content = "관찰하는데 있어서는 준비된 자에게만 기회가 온다.";

INSERT INTO todos SET
reg_date = NOW(),
autor = "마하트마 간디",
content = "국민을 비굴하게 만드는 정치가 가장 나쁜 정치다.";


SELECT * FROM todos ORDER BY RAND() LIMIT 1

UPDATE todos SET hit = 0, like_count = 0, dislike_count = 0;

SELECT * FROM todos;