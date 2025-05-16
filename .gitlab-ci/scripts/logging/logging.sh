#!/usr/bin/env bash

startLogCollapsedSection() {
    local section_title="${1}"
    local section_description="${2}"

    local section_id=${section_title// /_} # Убираем пробелы и заменяем на _
    local section_id=${section_id//[^[:alnum:]._-]/-} # Заменяем все символы, кроме (букв, цифр, -, ., _) на -

    echo -e "\e[0Ksection_start:`date +%s`:section_id_$section_id[collapsed=true]\r\e[0K\e[36;1m$section_title\e[0;m\e[0;m" >&2
    if [ -n "$section_description" ]; then
        logVerbose "$section_description"
    fi
}

endLogSection() {
    local section_title="${1}"

    local right_section_title=${section_title// /_} # Убираем пробелы и заменяем на _
    local right_section_id=${right_section_title//[^[:alnum:]._-]/-} # Заменяем все символы, кроме (букв, цифр, -, ., _) на -

    echo -e "\e[0Ksection_end:`date +%s`:section_id_$right_section_id\r\e[0K"
}

exe() {
    logVerbose "Starting: \"$(echo "$@" | tr -s ' ')\" with workdir: \"$(pwd)\""

    eval "$@" 2>&1
    return $?
}

logVerbose() {
    local message=$1
    echo -e "\e[34m$message\e[0m"
}
