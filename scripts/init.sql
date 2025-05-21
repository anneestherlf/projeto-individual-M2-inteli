-- Tabela de usuários
CREATE TABLE User (
  user_id_PK SERIAL PRIMARY KEY,
  user_email VARCHAR(100) UNIQUE NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  user_name TEXT NOT NULL
);

-- Tabela de ganhos
CREATE TABLE earnings (
  earning_id_PK SERIAL PRIMARY KEY,
  value_earning FLOAT NOT NULL,
  description_earning TEXT,
  date_earning TIMESTAMP NOT NULL,
  category_earning TEXT,
  user_id_FK INT NOT NULL,
  CONSTRAINT fk_earnings_user FOREIGN KEY (user_id_FK) REFERENCES "User"(user_id_PK)
);

-- Tabela de metas
CREATE TABLE goals (
  goal_id_PK SERIAL PRIMARY KEY,
  goal_title TEXT NOT NULL,
  goal_total_value FLOAT NOT NULL,
  goal_accumulated_value FLOAT DEFAULT 0,
  goal_is_completed BOOLEAN DEFAULT FALSE,
  user_id_FK INT NOT NULL,
  CONSTRAINT fk_goals_user FOREIGN KEY (user_id_FK) REFERENCES "User"(user_id_PK)
);

-- Tabela de despesas
CREATE TABLE expenses (
  expense_id_PK SERIAL PRIMARY KEY,
  value_expense FLOAT NOT NULL,
  description_expense TEXT,
  date_expense TIMESTAMP NOT NULL,
  category_expense TEXT,
  user_id_FK INT NOT NULL,
  CONSTRAINT fk_expenses_user FOREIGN KEY (user_id_FK) REFERENCES "User"(user_id_PK)
);

-- Tabela de itens da lista de tarefas
CREATE TABLE to_do_list_item (
  to_do_list_item_id_PK SERIAL PRIMARY KEY,
  to_do_list_item_description TEXT NOT NULL,
  to_do_list_item_is_completed BOOLEAN DEFAULT FALSE,
  user_id_FK INT NOT NULL,
  CONSTRAINT fk_todolist_user FOREIGN KEY (user_id_FK) REFERENCES "User"(user_id_PK)
);