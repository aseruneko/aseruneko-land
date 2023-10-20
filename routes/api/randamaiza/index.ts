import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  return await Response.json({ text: randomWord() });
};

function randomWord(): string {
  const words = [
    "ストレス",
    "リサイクル",
    "ボランティア",
    "レクリエーション",
    "テーマ",
    "サンプル",
    "リフレッシュ",
    "インターネット",
    "ピーク",
    "スタッフ",
    "キャンペーン",
    "リーダーシップ",
    "ホームページ",
    "フルタイム",
    "コスト",
    "ケア",
    "リスク",
    "コーディネート",
    "パフォーマンス",
    "カウンセリング",
    "バリアフリー",
    "プロジェクト",
    "ドキュメント",
    "ノウハウ",
    "バックアップ",
    "ライフスタイル",
    "シフト",
    "ニーズ",
    "ミスマッチ",
    "ヒアリング",
    "オンライン",
    "セキュリティ",
    "ホワイトカラー",
    "コーディネーター",
    "アクセス",
    "ビジョン",
    "シミュレーション",
    "コミュニティ",
    "リアルタイム",
    "トレンド",
    "シェア",
    "マーケティング",
    "リコール",
    "マネージメント",
    "ガイドライン",
    "パートナーシップ",
    "オブザーバー",
    "ハードウェア",
    "ミッション",
    "ライフライン",
    "デリバリー",
    "ベンチャー",
    "ダンピング",
    "ライブラリー",
    "プレゼンテーション",
    "ワークショップ",
    "コンセプト",
    "グローバル",
    "アイドリングストップ",
    "バーチャル",
    "フォローアップ",
    "フィードバック",
    "フロンティア",
    "パブリック",
    "モチベーション",
    "セクター",
    "マクロ",
    "イニシアチブ",
    "スクーリング",
    "バーチャル・リアリティー",
    "ボーダーレス",
    "ログイン",
    "サテライト",
    "ウェブサイト",
    "アプリケーション",
    "コンセンサス",
    "マネージメント・システム",
    "ポテンシャル",
    "コア",
    "コンテンツ",
    "セーフティネット",
    "アイデンティティ",
    "インサイダー",
    "モニタリング",
    "インフォームド・コンセント",
    "ケーススタディ",
    "コラボレーション",
    "アセスメント",
    "インフラ",
    "グローバリゼーション",
    "スクーリング",
    "オピニオン",
    "スケールメリット",
    "サマリー",
    "ユニバーサルサービス",
    "グランドデザイン",
    "アナリスト",
    "トレード・オフ",
    "インターンシップ",
    "キャピタルゲイン",
    "フレームワーク",
    "キャッチアップ",
    "イノベーション",
    "モラトリアム",
    "ノーマライゼーション",
    "インセンティブ",
    "ジェンダー",
    "スキーム",
    "デジタル・アーカイブ",
    "トレーサビリティ",
    "モラルハザード",
    "リテラシー",
    "タスクフォース",
    "バックオフィス",
    "エンパワーメント",
    "メセナ",
    "ガバナンス",
    "エンフォースメント",
    "インキュベーション",
    "コンソーシアム",
    "スポンジケーキ",
    "パウンドケーキ",
    "ロールケーキ",
    "ケーキ",
    "タルト",
    "シュークリーム",
    "エクレア",
    "アップルパイ",
    "プリン",
    "マカロン",
    "ゼリー",
    "ムース",
    "ババロア",
    "スフレ",
    "ブラマンジェ",
    "パフェ",
    "モンブラン",
    "ミルフィーユ",
    "バウムクーヘン",
    "ビスケット",
    "クッキー",
    "サブレ",
    "ウエハース",
    "プレッツェル",
    "ワッフル",
    "マドレーヌ",
    "フィナンシェ",
    "ティラミス",
    "チュロス",
    "ドーナツ",
    "ラング・ド・シャ",
    "ショートケーキ",
    "チョコレートケーキ",
    "ザッハトルテ",
    "ガトーショコラ",
    "キャンディ",
    "ドロップ",
    "キャラメル",
    "マシュマロ",
    "グミ",
    "ゼリービーンズ",
    "チューインガム",
    "チョコレート",
    "アイスクリーム",
    "シャーベット",
    "ソフトクリーム",
    "アイスキャンデー",
    "ジェラート",
    "ポテトチップス",
    "ポップコーン",
    "スナックバー",
    "アコースティックギター",
    "ヴィオラ",
    "ベース",
    "ウクレレ",
    "エレクトリックギター",
    "ギター",
    "ヴァイオリン",
    "チェロ",
    "コントラバス",
    "ハープ",
    "バンジョー",
    "マンドリン",
    "リュート",
    "トランペット",
    "トロンボーン",
    "ホルン",
    "ユーフォニアム",
    "チューバ",
    "ピッコロ",
    "フルート",
    "オーボエ",
    "クラリネット",
    "サクソフォン",
    "リコーダー",
    "バグパイプ",
    "アコーディオン",
    "オルガン",
    "チェンバロ",
    "ピアノ",
    "ヴィブラフォン",
    "カホン",
    "シロフォン",
    "シンバル",
    "スネアドラム",
    "バスドラム",
    "タンバリン",
    "ティンパニ",
    "トライアングル",
    "マラカス",
    "マリンバ",
    "ハーモニカ",
    "シンセサイザー",
    "ピアノ",
    "カリンバ",
    "ペンダント",
    "ビール",
    "パン",
    "セメント",
    "ボタン",
    "ピラミッド",
    "パピルス",
    "チャリオット",
    "アーチ",
    "オーブン",
    "ドック",
    "ダガー",
    "アルファベット",
    "スキー",
    "カバディ",
    "レンズ",
    "オンドル",
    "ガラス",
    "ゴム",
    "スポーク",
    "フォーク",
    "ブリッジ",
    "カタパルト",
    "ダイヤモンド",
    "クロム",
    "カシミア",
    "アストロラーベ",
    "インディゴ",
    "ジュート",
    "タール",
    "ガソリン",
    "オートマタ",
    "プログラミング",
    "ガスマスク",
    "フェイルセーフ",
    "タービン",
    "ナフサ",
    "シミュレーション",
    "メトロノーム",
    "ハンググライダー",
    "レストラン",
    "ソフトドリンク",
    "シロップ",
    "アナログ",
    "ピンホールカメラ",
    "カルシウム",
    "レリーフ",
    "フライホイール",
    "コークス",
    "ロケット",
    "トレビュシェット",
    "サングラス",
    "シャフト",
    "ピストン",
    "ポンプ",
    "クランク",
    "メニュー",
    "コンドーム",
    "マスケット",
    "エーテル",
    "タービン",
    "プレハブ",
    "ノギス",
    "クロノメーター",
    "シャープペンシル",
    "リトグラフ",
    "スクリュー",
    "モルヒネ",
    "スターリングエンジン",
    "ジャイロスコープ",
    "ブンゼンバーナー",
    "ライター",
    "マッチ",
    "タイプライター",
    "ハーベスター",
    "ヘルメット",
    "ファクシミリ",
    "ミシン",
    "セルロイド",
    "ケーブル",
    "バドミントン",
    "リノリウム",
    "ダイナマイト",
    "マーガリン",
    "チューインガム",
    "ケーブルカー",
    "ジーンズ",
    "ヘロイン",
    "スピーカー",
    "ステープラー",
    "マイクロフォン",
    "レジスター",
    "パンチカード",
    "ボールペン",
    "ローラーコースター",
    "オートバイ",
    "コーラ",
    "コンタクトレンズ",
    "レコード",
    "シネマトグラフ",
    "ファスナー",
    "モンキーレンチ",
    "テスラコイル",
    "エスカレーター",
    "エレベーター",
    "アドレナリン",
    "エアコンディショナー",
    "セロファン",
    "ベークライト",
    "サプレッサー",
    "アサルトライフル",
    "ブラジャー",
    "クロスワード",
    "ステンレス",
    "フリップフロップ",
    "ポリグラフ",
    "レーダー",
    "スプレー",
    "テレビジョン",
    "ナイロン",
    "ヘリコプター",
    "トランジスタ",
    "クレジットカード",
    "ハードディスク",
    "ビデオテープ",
    "インスタントラーメン",
    "レーザー",
    "ディスク",
    "ダイオード",
    "マウス",
    "ランデブー",
    "ドッキング",
    "クォーツ",
    "ペットボトル",
    "ピンセット",
    "データベース",
    "メール",
    "ルービックキューブ",
    "ハイブリッド",
    "デジタルカメラ",
    "オーディオ",
    "フラッシュメモリ",
    "インターネット",
    "テトリス",
    "ヒトゲノム",
    "ブロックチェーン",
    "アイデア",
    "アイロン",
    "アクセサリー",
    "アクセント",
    "アナウンサー",
    "アパート",
    "アプローチ",
    "アマチュア",
    "アルコール",
    "アルバイト",
    "アルバム",
    "アンケート",
    "アンコール",
    "アンテナ",
    "インターチェンジ",
    "インターフォン",
    "インタビュー",
    "ウイスキー",
    "ウイルス",
    "ウエイトレス",
    "エチケット",
    "エネルギー",
    "エプロン",
    "エレガント",
    "エンジニア",
    "オイル",
    "オーケストラ",
    "オートメーション",
    "オフィス",
    "オリエンテーション",
    "ガイドブック",
    "カーテン",
    "カーペット",
    "カクテル",
    "ガソリンスタンド",
    "カテゴリー",
    "カメラマン",
    "カロリー",
    "カンニング",
    "キャプテン",
    "キャンパス",
    "ギャング",
    "クイズ",
    "クラシック",
    "クリーニング",
    "クレーン",
    "ケース",
    "コート",
    "コーヒー",
    "コーラス",
    "コマーシャル",
    "コミュニケーション",
    "コレクション",
    "コメント",
    "コンクリート",
    "コンサート",
    "コンセント",
    "コントラスト",
    "コントロール",
    "サイレン",
    "サービス",
    "サラリーマン",
    "サンドイッチ",
    "サンプル",
    "シーズン",
    "シナリオ",
    "シャッター",
    "ジャーナリスト",
    "ジャンパー",
    "ジャンル",
    "シリーズ",
    "スカーフ",
    "スクリーン",
    "スケジュール",
    "スチュワーデス",
    "ステレオ",
    "ストッキング",
    "ストライキ",
    "ストロボ",
    "スプリング",
    "スポーツカー",
    "スライド",
    "セクション",
    "セーター",
    "セックス",
    "セメント",
    "セレモニー",
    "ソファー",
    "タイプライター",
    "タイミング",
    "タイムリー",
    "ダイヤル",
    "タクシー",
    "タレント",
    "チームワーク",
    "チャンネル",
    "デコレーション",
    "デッサン",
    "デート",
    "ドライブイン",
    "トレーニング",
    "ナンセンス",
    "ニュアンス",
    "ノイローゼ",
    "バイキング",
    "パイロット",
    "パジャマ",
    "パスポート",
    "パターン",
    "パチンコ",
    "バッテリー",
    "パーセント",
    "バランス",
    "ハンカチ",
    "ハンドバッグ",
    "ハンバーグ",
    "ビタミン",
    "ビニール",
    "フィルター",
    "プラットホーム",
    "プレゼント",
    "ベストセラー",
    "ベテラン",
    "ボイコット",
    "ポジション",
    "ポケット",
    "ボーナス",
    "マイナス",
    "マスコミ",
    "ムード",
    "メートル",
    "メロディー",
    "モダン",
    "モノレール",
    "モーテル",
    "ユニーク",
    "ユーモア",
    "ライバル",
    "ラッシュアワー",
    "ラジカセ",
    "ラベル",
    "ランプ",
    "リボン",
    "レインコート",
    "レギュラー",
    "レジャー",
    "レバー",
    "レンタカー",
    "ロマンチック",
    "ワープロ",
    "ワンピース",
    "アウトソーシング",
    "アサイン",
    "アジェンダ",
    "アテンド",
    "アライアンス",
    "イニシアチブ",
    "プロジェクト",
    "インセンティブ",
    "モチベーション",
    "インバウンド",
    "アウトバウンド",
    "インフルエンサー",
    "エスカレーション",
    "コールセンター",
    "ホワイトボード",
    "エビデンス",
    "キャパシティ",
    "キュレーション",
    "クライアント",
    "クリティカル",
    "コアコンピタンス",
    "ノウハウ",
    "コミットメント",
    "コンシューマー",
    "コンセンサス",
    "マーケティング",
    "サードパーティ",
    "サステナブル",
    "サマリー",
    "シナジー",
    "シンギュラリティ",
    "スコープ",
    "ステークホルダー",
    "ダイバーシティ",
    "タスク",
    "データマイニング",
    "デフォルト",
    "トップダウン",
    "ボトムアップ",
    "ニッチェ",
    "ノマド",
    "ノルマ",
    "バッファ",
    "パラダイム",
    "ヒューリスティック",
    "コストパフォーマンス",
    "フィードバック",
    "ブラッシュアップ",
    "ブルーオーシャン",
    "ブレーンストーミング",
    "プロモーション",
    "ベクトル",
    "スカラー",
    "マージン",
    "マイルストーン",
    "メソッド",
    "メンター",
    "モジュール",
    "ユーザビリティ",
    "ユーティリティ",
    "リスクヘッジ",
    "ワークフロー",
    "サッカー",
    "フットサル",
    "ソフトボール",
    "ゴルフ",
    "テニス",
    "バスケットボール",
    "ラグビー",
    "バレーボール",
    "アメリカンフットボール",
    "バドミントン",
    "ハンドボール",
    "クリケット",
    "ラクロス",
    "ドッジボール",
    "ゲートボール",
    "ボウリング",
    "ビリヤード",
    "ランニング",
    "フィットネス",
    "ヨガ",
    "ダンス",
    "サイクリング",
    "ダーツ",
    "スノーボード",
    "フィギュアスケート",
    "アイスホッケー",
    "ボクシング",
    "フェンシング",
    "ムエタイ",
    "レスリング",
    "テコンドー",
    "セパタクロー",
    "サーフィン",
    "アヴァンギャルド",
    "インスタレーション",
    "オークション",
    "インテリア",
    "キュビズム",
    "キリスト",
    "クロッキー",
    "グラフィティ",
    "コラージュ",
    "サブカルチャー",
    "シュルレアリスム",
    "シルクスクリーン",
    "ディテール",
    "デッサン",
    "トロンプルイユ",
    "パブリック",
    "コピーライト",
    "パフォーマンス",
    "パッケージ",
    "フェティシズム",
    "ルネサンス",
    "ポストモダン",
    "モニュメント",
    "レディメイド",
    "ワークショップ",
    "グラフ",
    "ルート",
    "ビーカー",
    "フラスコ",
    "シャーレ",
    "メスシリンダー",
    "ピペット",
    "オリエント",
    "アニミズム",
    "シャーマニズム",
    "カースト",
    "ギルド",
    "スパチュラ",
    "トング",
    "レードル",
    "ミトン",
    "フライパン",
    "シンク",
    "ドライヤー",
    "インターホン",
    "カーナビ",
    "コピー",
    "スマートフォン",
    "テレビゲーム",
    "トースター",
    "トランシーバー",
    "ハロゲンヒーター",
    "ビデオカメラ",
    "プロジェクタ",
    "ホームシアター",
    "マッサージ",
    "ヨーグルト",
    "ランタン",
    "リノベーション",
    "アヒージョ",
    "ガウチョパンツ",
    "マタハラ",
    "パタハラ",
    "セクハラ",
    "フレキシブル",
    "コンプライアンス",
    "レジュメ",
    "プリント",
    "マニフェスト",
    "オンデマンド",
    "ガジェット",
    "アナリスト",
    "クラウドファンディング",
    "ハイレゾ",
    "アーティスト",
    "アナウンサー",
    "イラストレーター",
    "インストラクター",
    "エステティシャン",
    "プロデューサー",
    "カウンセラー",
    "カスタマーサービス",
    "セラピスト",
    "コンサルタント",
    "デザイナー",
    "ディレクター",
    "ケースワーカー",
    "クリエイター",
    "シナリオライター",
    "ゴーストライター",
    "コミッショナー",
    "コメディアン",
    "コ・メディカル",
    "コンサルタント",
    "コンシェルジュ",
    "シンガーソングライター",
    "ショコラティエ",
    "スタイリスト",
    "スタントマン",
    "セラピスト",
    "ダイバーシティタレント",
    "ダンサー",
    "チェリスト",
    "トラックメイカー",
    "トレジャーハンター",
    "ナレーター",
    "ネイリスト",
    "パイロット",
    "バスガイド",
    "バーテンダー",
    "バリスタ",
    "ファシリテーター",
    "ベビーシッター",
    "ボディガード",
    "マジシャン",
    "メイド",
    "メジャーリーガー",
    "ソムリエ",
    "チャレンジャー",
    "パーソナリティ",
    "ルポライター",
    "レンジャー",
    "ハローワーク",
  ];
  return words[Math.floor(Math.random() * words.length)];
}
