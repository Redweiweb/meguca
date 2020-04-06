// For html macro
#![recursion_limit = "1024"]

#[macro_use]
mod lang;
#[macro_use]
mod banner;
mod buttons;
mod config;
mod connection;
mod options;
mod page_selector;
mod post;
mod state;
mod subs;
mod thread;
mod thread_index;
mod time;
mod user_bg;
mod util;
mod widgets;

use time::scheduler::Scheduler;
use wasm_bindgen::prelude::*;
use yew::{html, Bridge, Bridged, Component, ComponentLink, Html};

struct App {
	// Keep here to load global state and connection agents first
	#[allow(unused)]
	link: ComponentLink<Self>,
	#[allow(unused)]
	state: Box<dyn Bridge<state::Agent>>,
	#[allow(unused)]
	conn: Box<dyn Bridge<connection::Connection>>,

	// XXX: Not storing this here causes Scheduler to go into an infinite loop,
	// when Scheduler creates a Bridge to Options.
	// https://github.com/yewstack/yew/issues/1080
	#[allow(unused)]
	timer: Box<dyn Bridge<Scheduler>>,
}

impl Component for App {
	type Message = ();
	type Properties = ();

	fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
		use state::{get, Agent, Request};

		let mut a = Agent::bridge(link.callback(|_| ()));
		a.send(Request::FetchFeed(get().location.clone()));
		Self {
			state: a,
			conn: connection::Connection::bridge(link.callback(|_| ())),
			timer: Scheduler::bridge(link.callback(|_| ())),
			link,
		}
	}

	fn update(&mut self, _: Self::Message) -> bool {
		false
	}

	fn view(&self) -> Html {
		html! {
			<section>
				<user_bg::Background />
				<div class="overlay-container">
					<banner::Banner />
				</div>
				<section id="main">
					<widgets::AsideRow is_top=true />
					<hr />
					<thread_index::Threads />
					<hr />
					<widgets::AsideRow />
				</section>
			</section>
		}
	}
}

#[wasm_bindgen(start)]
pub async fn main_js() -> util::Result {
	if cfg!(debug_assertions) {
		console_error_panic_hook::set_once();
	}

	state::init()?;
	lang::load_language_pack().await?;

	yew::start_app::<App>();

	Ok(())
}
