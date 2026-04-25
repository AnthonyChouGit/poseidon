create table if not exists poseidon_users (
	uid SERIAL primary key,
	username VARCHAR(20) unique not null,
	hashed_password VARCHAR(60) not null,
	email TEXT,
	create_at TIMESTAMPTZ,
	last_login TIMESTAMPTZ
);

create table if not exists poseidon_apps(
	appid SERIAL primary key,
	title TEXT not null,
	summary TEXT,
	url TEXT,
	about_url TEXT,
	tags TEXT[],
	create_at TIMESTAMPTZ
);

insert into poseidon_apps (title, summary, url, about_url, tags, create_at) values 
('服务器运行监控', '监控服务器运行状态，包括CPU、内存、磁盘、网络等指标。', '/', '/', array['服务器', '监控', '状态'], now()),
('pwiki知识库', '用于放置个人知识库，支持快速查阅和编辑。', '/', '/', array['知识库', '查阅', '编辑'], now()),
('视频同步观看', '支持多人同时观看视频，支持实时同步进度。', '/', '/', array['视频', '同步', '观看'], now());