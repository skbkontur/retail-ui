rem "================================================================"
rem "=                      RENAME                                  ="
rem "================================================================"
call node scripts\rename.js %*


rem "================================================================"
rem "=                      APPLY CODE SHIFT                        ="
rem "================================================================"
call yarn jscodeshift -t transform-stage-1.js --extensions tsx --parser flow %*
call yarn jscodeshift -t transform-stage-2.js --extensions tsx --parser babylon %*

rem "================================================================"
rem "=                      DONE                                    ="
rem "================================================================"
