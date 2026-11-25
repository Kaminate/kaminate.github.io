cls
where /q chrome
if %ERRORLEVEL% equ 0 (
  chrome "http://localhost:1313"
) else (
  firefox "http://localhost:1313"
)

hugo serve -D --disableFastRender
