import type { Comic } from "../types";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const SEED_COMICS: Comic[] = [
  {
    id: 1, name: "One Piece", author: "Oda Eiichiro", price: 55000,
    image: "https://picsum.photos/seed/onepiece/400/580",
    genre: "adventure", desc: "Cuộc phiêu lưu của băng Mũ Rơm trên hành trình tìm kho báu One Piece.",
    chapters: Array.from({length: 112}, (_, i) => ({id: i+1, number: i+1, title: i === 0 ? "Romance Dawn" : `Chap ${i+1}`, date: daysAgo(i * 2)})),
    views: 9850000, followers: 125000, isHot: true, status: "ongoing", rating: 4.9, lastChapterDate: daysAgo(0),
  },
  {
    id: 2, name: "Naruto", author: "Masashi Kishimoto", price: 45000,
    image: "https://picsum.photos/seed/naruto/400/580",
    genre: "action", desc: "Câu chuyện về cậu bé ninja làng Lá trên hành trình trở thành Hokage.",
    chapters: Array.from({length: 72}, (_, i) => ({id: i+1, number: i+1, title: i === 0 ? "Nhập môn" : `Chap ${i+1}`, date: daysAgo(i * 3)})),
    views: 7200000, followers: 98000, isHot: true, status: "completed", rating: 4.8, lastChapterDate: daysAgo(5),
  },
  {
    id: 3, name: "Attack on Titan", author: "Hajime Isayama", price: 60000,
    image: "https://picsum.photos/seed/aot/400/580",
    genre: "action", desc: "Cuộc chiến sinh tồn của nhân loại chống lại những người khổng lồ.",
    chapters: Array.from({length: 139}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i)})),
    views: 8500000, followers: 112000, isHot: true, status: "completed", rating: 4.9, lastChapterDate: daysAgo(1),
  },
  {
    id: 4, name: "Doraemon", author: "Fujiko F. Fujio", price: 35000,
    image: "https://picsum.photos/seed/doraemon/400/580",
    genre: "comedy", desc: "Chú mèo máy đến từ tương lai giúp đỡ cậu bé Nobita.",
    chapters: Array.from({length: 45}, (_, i) => ({id: i+1, number: i+1, title: `Tập ${i+1}`, date: daysAgo(i * 7)})),
    views: 4500000, followers: 65000, isHot: false, status: "ongoing", rating: 4.5, lastChapterDate: daysAgo(10),
  },
  {
    id: 5, name: "Conan", author: "Aoyama Gosho", price: 40000,
    image: "https://picsum.photos/seed/conan/400/580",
    genre: "mystery", desc: "Thám tử nhí Shinichi Kudo phá án sau khi bị teo nhỏ.",
    chapters: Array.from({length: 200}, (_, i) => ({id: i+1, number: i+1, title: `File ${i+1}`, date: daysAgo(i)})),
    views: 6200000, followers: 87000, isHot: true, status: "ongoing", rating: 4.7, lastChapterDate: daysAgo(2),
  },
  {
    id: 6, name: "Dragon Ball", author: "Akira Toriyama", price: 50000,
    image: "https://picsum.photos/seed/dragonball/400/580",
    genre: "martial-arts", desc: "Hành trình tìm ngọc rồng và bảo vệ Trái Đất của Songoku.",
    chapters: Array.from({length: 52}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i * 4)})),
    views: 9100000, followers: 135000, isHot: true, status: "completed", rating: 4.9, lastChapterDate: daysAgo(30),
  },
  {
    id: 7, name: "Jujutsu Kaisen", author: "Gege Akutami", price: 52000,
    image: "https://picsum.photos/seed/jujutsu/400/580",
    genre: "fantasy", desc: "Thế giới nguyền hồn và chú thuật của cậu bé Itadori Yuji.",
    chapters: Array.from({length: 86}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i * 2)})),
    views: 5800000, followers: 95000, isHot: true, status: "ongoing", rating: 4.8, lastChapterDate: daysAgo(0),
  },
  {
    id: 8, name: "Demon Slayer", author: "Koyoharu Gotouge", price: 48000,
    image: "https://picsum.photos/seed/demonslayer/400/580",
    genre: "action", desc: "Hành trình diệt quỷ của Tanjiro để cứu em gái khỏi lời nguyền.",
    chapters: Array.from({length: 205}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i)})),
    views: 7800000, followers: 108000, isHot: true, status: "completed", rating: 4.9, lastChapterDate: daysAgo(3),
  },
  {
    id: 9, name: "Solo Leveling", author: "Chugong", price: 55000,
    image: "https://picsum.photos/seed/sololeveling/400/580",
    genre: "fantasy", desc: "Thợ săn hạng E Sung Jinwoo trở thành kẻ mạnh nhất trong thế giới dungeon.",
    chapters: Array.from({length: 179}, (_, i) => ({id: i+1, number: i+1, title: i === 0 ? "Cửa Hầm" : `Chap ${i+1}`, date: daysAgo(i * 1.5)})),
    views: 12000000, followers: 200000, isHot: true, status: "completed", rating: 5.0, lastChapterDate: daysAgo(7),
  },
  {
    id: 10, name: "Tower of God", author: "SIU", price: 50000,
    image: "https://picsum.photos/seed/towerofgod/400/580",
    genre: "fantasy", desc: "Cậu bé Baam leo lên tháp để tìm lại người bạn thân.",
    chapters: Array.from({length: 98}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i * 2)})),
    views: 3600000, followers: 55000, isHot: false, status: "ongoing", rating: 4.6, lastChapterDate: daysAgo(4),
  },
  {
    id: 11, name: "The God of High School", author: "Park Yongje", price: 47000,
    image: "https://picsum.photos/seed/godofhighschool/400/580",
    genre: "martial-arts", desc: "Giải đấu võ thuật giữa các học sinh cao trung Hàn Quốc.",
    chapters: Array.from({length: 45}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i * 3)})),
    views: 2800000, followers: 42000, isHot: false, status: "completed", rating: 4.4, lastChapterDate: daysAgo(15),
  },
  {
    id: 12, name: "Noblesse", author: "Son Jeho", price: 52000,
    image: "https://picsum.photos/seed/noblesse/400/580",
    genre: "fantasy", desc: "Chủ nhân lâu đài thức tỉnh sau 820 năm và bảo vệ thế giới loài người.",
    chapters: Array.from({length: 62}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i * 3)})),
    views: 3100000, followers: 48000, isHot: false, status: "completed", rating: 4.5, lastChapterDate: daysAgo(20),
  },
  {
    id: 13, name: "Wind Breaker", author: "Yongseok Jo", price: 49000,
    image: "https://picsum.photos/seed/windbreaker/400/580",
    genre: "school-life", desc: "Câu chuyện về những người đam mê xe đạp và tình bạn tuổi học trò.",
    chapters: Array.from({length: 55}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i * 2.5)})),
    views: 2200000, followers: 35000, isHot: false, status: "ongoing", rating: 4.6, lastChapterDate: daysAgo(6),
  },
  {
    id: 14, name: "Lookism", author: "Park Taejoon", price: 46000,
    image: "https://picsum.photos/seed/lookism/400/580",
    genre: "drama", desc: "Cậu bé bị bắt nạt có khả năng chuyển đổi giữa hai cơ thể.",
    chapters: Array.from({length: 78}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i * 2)})),
    views: 4100000, followers: 62000, isHot: true, status: "ongoing", rating: 4.7, lastChapterDate: daysAgo(1),
  },
  {
    id: 15, name: "My Hero Academia", author: "Kohei Horikoshi", price: 53000,
    image: "https://picsum.photos/seed/mha/400/580",
    genre: "action", desc: "Cậu bé Izuku Midoriya theo đuổi ước mơ trở thành anh hùng.",
    chapters: Array.from({length: 95}, (_, i) => ({id: i+1, number: i+1, title: `Chap ${i+1}`, date: daysAgo(i * 2)})),
    views: 5400000, followers: 82000, isHot: true, status: "ongoing", rating: 4.7, lastChapterDate: daysAgo(0),
  },
];

export const FEATURED_IDS = [1, 3, 6, 9, 7, 14];
