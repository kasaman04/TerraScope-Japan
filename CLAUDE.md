# Claude Code 設定

## 通知設定
以下のタイミングで5回の通知音を鳴らす：
- 作業完了時
- ユーザーに選択肢を尋ねるとき

通知音コマンド：
```bash
for i in {1..5}; do powershell.exe -c "[console]::beep(800,500)"; sleep 1; done
```