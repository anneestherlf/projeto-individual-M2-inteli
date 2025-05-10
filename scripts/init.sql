-- Tabela de usuários
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(100) UNIQUE NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de despesas
CREATE TABLE expenses (
  id_expense SERIAL PRIMARY KEY,
  value_expense FLOAT NOT NULL,
  description_expense TEXT,
  date_expense TIMESTAMP NOT NULL,
  category_expense TEXT,
  user_id INT NOT NULL,
  CONSTRAINT fk_expenses_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Tabela de ganhos
CREATE TABLE earnings (
  id_earning SERIAL PRIMARY KEY,
  value_earning FLOAT NOT NULL,
  description_earning TEXT,
  date_earning TIMESTAMP NOT NULL,
  category_earning TEXT,
  user_id INT NOT NULL,
  CONSTRAINT fk_earnings_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Tabela de metas
CREATE TABLE goals (
  goal_id SERIAL PRIMARY KEY,
  goal_title TEXT NOT NULL,
  goal_total_value FLOAT NOT NULL,
  goal_accumulated_value FLOAT DEFAULT 0,
  goal_is_completed BOOLEAN DEFAULT FALSE,
  user_id INT NOT NULL,
  CONSTRAINT fk_goals_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Tabela de itens da lista de tarefas
CREATE TABLE to_do_list_item (
  id SERIAL PRIMARY KEY,
  to_do_list_item_desc TEXT NOT NULL,
  to_do_list_item_is_completed BOOLEAN DEFAULT FALSE,
  user_id INT NOT NULL,
  CONSTRAINT fk_todolist_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
