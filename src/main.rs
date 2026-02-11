use image::io::Reader as ImageReader;
use clap::Parser;
use std::path::PathBuf;

#[derive(Parser)]
#[command(name = "corvin-ascii-gen")]
#[command(about = "Turn images into ASCII art", long_about = None)]
struct Args {
    #[arg(help = "Path to input image")]
    image_path: PathBuf,

    #[arg(short, long, default_value = "100", help = "Width of ASCII output in characters")]
    width: u32,

    #[arg(short, long, help = "Invert brightness")]
    invert: bool,
}

fn main() {
    let args = Args::parse();

    let img = ImageReader::open(&args.image_path)
        .expect("Failed to open image")
        .decode()
        .expect("Failed to decode image");

    let rgb_img = img.to_rgb8();
    let (width, height) = rgb_img.dimensions();
    
    let target_width = args.width as usize;
    let aspect_ratio = height as f32 / width as f32;
    let target_height = ((target_width as f32) * aspect_ratio * 0.55) as usize;

    let ascii_chars = if args.invert {
        " .:=-+*#%@"
    } else {
        "@%#*+=-:. "
    };

    for y in 0..target_height {
        for x in 0..target_width {
            let px = (x as f32 / target_width as f32) * width as f32;
            let py = (y as f32 / target_height as f32) * height as f32;

            let pixel = rgb_img.get_pixel(px as u32, py as u32);
            let luminance = (0.299 * pixel[0] as f32 + 0.587 * pixel[1] as f32 + 0.114 * pixel[2] as f32) / 255.0;
            
            let index = ((1.0 - luminance) * (ascii_chars.len() - 1) as f32) as usize;
            let ch = ascii_chars.chars().nth(index).unwrap_or(' ');
            print!("{}", ch);
        }
        println!();
    }
}
