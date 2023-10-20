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
  ];
  return words[Math.floor(Math.random() * words.length)];
}
