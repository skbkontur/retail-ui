Для запуска selenium необходимо установить Java >= 8 и указать путь к JAVA_HOME в переменных окружения.
(Для MacOS в .bash_profile надо прописать: export JAVA_HOME=/Library/Java/Home).
Перед запуском тестов необходимо подготовить selenium, запустив команду `yarn run setup-test`.
Затем необходимо развернуть storybook, и после этого можно запускать тесты командой `yarn run test`.